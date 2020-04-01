import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import * as constant from '../searchConstants';
import {MatSnackBar} from '@angular/material';
import {GlobalDestinationsObject,CalculatedExpenditure,UserParameters} from '../search.interface';
import LocationData from './location.json';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;

  calculatedExpenditure: CalculatedExpenditure = {
    hotelExpenditure: 0,
    foodExpenditure: 0,
    travelExpenditure: 0
  };
  radius: any;

  globalDestinationsObject : GlobalDestinationsObject[] = LocationData;

  constructor(private snackBar: MatSnackBar) {

  }

  ngAfterViewInit() {
    /**
     * Init search here
     */
    this.initSearch();
  }


  initSearch() {

    /**
     * Initial parameters supplied from User
     */

    let budget;
    let byRoad = false;

    const userParameters:UserParameters = {
      durationOfTravel: 2,
      hotel: {
        starRating: 4
      },
      travel: {
        modeOfTravel: 'driving',
        driving: {
          typeOfEngine: 'petrol',
          typeOfVehicle: 'sedan'
        }
      },
      budgetPerPerson: 10000,
      numberOfTravelers: 2
    };

    if (userParameters.travel.modeOfTravel === 'twoWheeler' ||
      userParameters.travel.modeOfTravel === 'bus' ||
      userParameters.travel.modeOfTravel === 'driving') {
      byRoad = true;
    }

    const defaultPosition = {
      coords: {
        latitude: constant.searchConstants.defaultLocation.latitude,
        longitude: constant.searchConstants.defaultLocation.longitude
      }
    };

    try {

      budget = userParameters.budgetPerPerson * userParameters.numberOfTravelers;
      this.calculatedExpenditure.hotelExpenditure = this.getHotelExpenses(userParameters, budget);
      budget = budget - this.calculatedExpenditure.hotelExpenditure;
      this.calculatedExpenditure.foodExpenditure = this.getFoodExpenses(userParameters, budget);
      budget = budget - this.calculatedExpenditure.foodExpenditure;
      this.radius = this.calculateRadius(userParameters, budget);
      navigator.geolocation.getCurrentPosition((position) => {
        this.getApplicableLocations(this.radius, position, userParameters.durationOfTravel, byRoad);
      }, (error) => {
        console.log('No Location Available :: ' + error);
        this.getApplicableLocations(this.radius, defaultPosition, userParameters.durationOfTravel, byRoad);
      });
    } catch (e) {
      this.snackBar.open(e, '', {duration: 5000});
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
    hotelBudget = (Math.ceil(params.numberOfTravelers / 2)) * constant.searchConstants.hotelAndFoodPrices[params.hotel.starRating].hotelPrice * (params.durationOfTravel-1);
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
    foodBudget = params.numberOfTravelers * constant.searchConstants.hotelAndFoodPrices[params.hotel.starRating].foodPrice * (params.durationOfTravel);
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

    switch (params.travel.modeOfTravel) {

      case 'driving': {
        numberOfVehicles = Math.ceil(params.numberOfTravelers / travelConst.driving.seatingCapacity[params.travel[params.travel.modeOfTravel].typeOfVehicle]);
        radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.driving.engineType[params.travel[params.travel.modeOfTravel].typeOfEngine]));
        break;
      }
      case 'twoWheeler': {
        numberOfVehicles = Math.ceil(params.numberOfTravelers / travelConst.twoWheeler.seatingCapacity);
        radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.twoWheeler.petrol));
        break;
      }
      case 'bus': {
        radius = remainingBudget / (params.numberOfTravelers * travelConst.bus[params.travel[params.travel.modeOfTravel].typeOfBus ? params.travel[params.travel.modeOfTravel].typeOfBus : 'nonAc']);
        break;
      }
      case 'train': {
        radius = remainingBudget / (params.numberOfTravelers * travelConst.train[params.travel[params.travel.modeOfTravel].trainClass ? params.travel[params.travel.modeOfTravel].trainClass : 1]);
        break;
      }
      default: {
        numberOfVehicles = Math.ceil(params.numberOfTravelers / travelConst.twoWheeler.seatingCapacity);
        radius = Math.ceil(remainingBudget / (numberOfVehicles * travelConst.twoWheeler.petrol));
        break;
      }
    }
    return (radius / 2);
  }

  /**
   *
   * @param radius
   * @param position
   * @param totalDays
   * @param byRoad
   */
  getApplicableLocations(radius, position, totalDays, byRoad) {

    /**
     * Configure to get the data from Database
     */


    const destinationsArray = [];
    this.globalDestinationsObject.forEach((ele) => {
      destinationsArray.push(ele.location);
    });

    let currentUserLocation;
    const applicableLocations = [];
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
                longitude: this.globalDestinationsObject[destinationIndex++].longitude
              });
            }
          }
        });
        this.mapInitializer(applicableLocations, position);
      });
  }


  /**
   *
   * @param locations
   * @param position
   */
  mapInitializer(locations, position) {

    const infoWindow = new google.maps.InfoWindow();
    let destinationMarker;

    const coordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    const mapOptions = this.mapOptions = {
      center: coordinates,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.BOUNCE
    });

    google.maps.event.addListener(marker, 'click', (() => {
      return () => {
        infoWindow.setContent('Your current location');
        infoWindow.open(this.map, marker);
      };
    })());

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker.setMap(this.map);

    for (let i = 0; i < locations.length; i++) {
      destinationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
        map: this.map,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(destinationMarker, 'click', ((mark, j, destinationsLocations, map) => {
        return () => {
          infoWindow.setContent(destinationsLocations[j].location);
          infoWindow.open(map, mark);
        };
      })(destinationMarker, i, locations, this.map));
    }
  }

}
