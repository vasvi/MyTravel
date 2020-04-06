import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {CalculatedExpenditure, GlobalDestinationsObject, UserParameters, ApplicableLocationObject} from '../model/search-criteria';
import LocationData from '../search/location.json';
import * as constant from '../searchConstants';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {
    private userSearchObject: UserParameters;
    globalDestinationsObject : GlobalDestinationsObject[] = LocationData;
    private subject = new Subject<any>();

    /** Sets userSearchObject with the object passed in */
    setUserSearchData = (searchParans: UserParameters) => {
        this.userSearchObject = searchParans;
    };

    /**Returns userSearchObject  */
    getUserSearchData = (): Observable<UserParameters> => {
        return of(this.userSearchObject);
    }

    /** Search Logic goes below this */

    calculatedExpenditure: CalculatedExpenditure = {
        hotelExpenditure: 0,
        foodExpenditure: 0,
        travelExpenditure: 0
    };
    radius: any;

    initSearch(userParameters: UserParameters) {

        /**
         * Initial parameters supplied from User
         */
    
        let budget;
        let byRoad = false;
    
        if (userParameters.travel.travelmode === constant.travelMode.twowheeler ||
          userParameters.travel.travelmode === constant.travelMode.bus ||
          userParameters.travel.travelmode === constant.travelMode.fourwheeler) {
          byRoad = true;
        }
    
        const defaultPosition = {
          coords: {
            latitude: constant.searchConstants.defaultLocation.latitude,
            longitude: constant.searchConstants.defaultLocation.longitude
          }
        };
    
        try {
    
          budget = userParameters.budget * userParameters.person;
          this.calculatedExpenditure.hotelExpenditure = this.getHotelExpenses(userParameters, budget);
          budget = budget - this.calculatedExpenditure.hotelExpenditure;
          this.calculatedExpenditure.foodExpenditure = this.getFoodExpenses(userParameters, budget);
          budget = budget - this.calculatedExpenditure.foodExpenditure;
          this.radius = this.calculateRadius(userParameters, budget);
          navigator.geolocation.getCurrentPosition((position) => {
            this.getApplicableLocations(this.radius, position, userParameters.duration, byRoad, this.calculatedExpenditure);
          }, (error) => {
            console.log('No Location Available :: ' + error);
            //this.getApplicableLocations(this.radius, defaultPosition, userParameters.duration, byRoad, this.calculatedExpenditure);
          });
        } catch (e) {
          //this.snackBar.open(e, '', {duration: 5000});
        }
      }
    
      /**
       * @param params
       */
      budgetValidations(budget) {
        if (budget && budget > 0) {
          return true;
        } else {
          throw new Error('Your budget is too low. Please add more or change parameters of search');
        }
      }
    
      /**
       *
       * @param params
       * @param remainingBudget
       * @returns {any}
       */
      getHotelExpenses(params:UserParameters , remainingBudget) {
        let hotelBudget;
        hotelBudget = (Math.ceil(params.person / 2)) * constant.searchConstants.hotelAndFoodPrices[params.hotel.starrating].hotelPrice * (params.duration-1);
        if (this.budgetValidations(remainingBudget - hotelBudget)) {
          return hotelBudget;
        } else {
          /**
           * TODO :: Show message to user
           */
          return false;
        }
      }
    
      /**
       *
       * @param params
       * @param remainingBudget
       * @returns {any}
       */
      getFoodExpenses(params: UserParameters, remainingBudget) {
        let foodBudget;
        foodBudget = params.person * constant.searchConstants.hotelAndFoodPrices[params.hotel.starrating].foodPrice * (params.duration);
        if (this.budgetValidations(remainingBudget - foodBudget)) {
          return foodBudget;
        } else {
          /**
           * TODO :: Show message to user
           */
          return false;
        }
    
      }
    
      /**
       *
       * @param params
       * @param remainingBudget
       * @returns {any}
       */
      calculateRadius(params:UserParameters , remainingBudget) {
        let radius;
        let numberOfVehicles;
        const travelConst = constant.searchConstants.modeOfTravelPrices;
    
        this.calculatedExpenditure.travelExpenditure = remainingBudget;
    
        switch (params.travel.travelmode) {
    
          case constant.travelMode.fourwheeler: {
            numberOfVehicles = Math.ceil(params.person / travelConst.driving.seatingCapacity[params.travel.cartype]);
            radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.driving.engineType[params.travel.enginetype.toLowerCase()]));
            break;
          }
          case constant.travelMode.twowheeler: {
            numberOfVehicles = Math.ceil(params.person / travelConst.twoWheeler.seatingCapacity);
            radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.twoWheeler.petrol));
            break;
          }
          case constant.travelMode.bus: {
            radius = remainingBudget / (params.person * travelConst.bus[params.travel.bustype ? params.travel.bustype.toLowerCase() : 'nonAc']);
            break;
          }
          case constant.travelMode.train: {
            radius = remainingBudget / (params.person * travelConst.train[params.travel.trainclass ? params.travel.trainclass : 1]);
            break;
          }
          default: {
            numberOfVehicles = Math.ceil(params.person / travelConst.twoWheeler.seatingCapacity);
            radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.twoWheeler.petrol));
            break;
          }
        }
        return (radius / 2);
      }

    /** This method can be called with just radius and/or current position to get non-parameterized search */
    getApplicableLocations=(radius:number=500, position?: Position, totalDays?: number, byRoad?: any, calculatedExpenditure?: any):void =>{

        /**
         * Configure to get the data from Database
         */
        const destinationsArray = [];
        const applicableLocations =[];
        this.globalDestinationsObject.forEach((ele) => {
          destinationsArray.push(ele.location);
        });

        let currentUserLocation;
        let destinationIndex = 0;

        currentUserLocation = position.coords.latitude + ',' + position.coords.longitude;
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [currentUserLocation],
            destinations: destinationsArray,
            travelMode: google.maps.TravelMode.TWO_WHEELER,
            avoidHighways: false,
            avoidTolls: false,
            unitSystem: google.maps.UnitSystem.METRIC
          }, (data) => {

            console.log(data);
            data.rows[0].elements.forEach((ele) => {
              if (ele.distance && ele.distance.value < (radius * 1000)) {
                /**
                 * Check for travel time also
                 */

                if (!byRoad || ele.duration.value * 2 < (totalDays * 24 * 60 * 60)) {
                  applicableLocations.push({
                    location: data.destinationAddresses[destinationIndex],
                    details: ele,
                    latitude: this.globalDestinationsObject[destinationIndex].latitude,
                    longitude: this.globalDestinationsObject[destinationIndex++].longitude,
                    expenditure: calculatedExpenditure
                  });
                }
              }
            });
            
            if (applicableLocations && position) {
                let locationData: ApplicableLocationObject = {
                    location: applicableLocations,
                    position: position
                };

                this.subject.next(locationData);
            }
        });
      }

      getApplicableLocationsSubs(): Observable<any> {
        return this.subject.asObservable();
    }
}

