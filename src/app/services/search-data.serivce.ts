import {Injectable} from '@angular/core';
import {UserParameters} from '../model/search-criteria';
import {Observable, of} from 'rxjs';
import {GlobalDestinationsObject} from '../model/search-criteria';
import LocationData from '../search/location.json';

@Injectable({
    providedIn: 'root'
})
export class SearchDataService {
    private userSearchObject: UserParameters;
    globalDestinationsObject : GlobalDestinationsObject[] = LocationData;

    /** Sets userSearchObject with the object passed in */
    setUserSearchData = (searchParans: UserParameters) => {
        this.userSearchObject = searchParans;
    };

    /**Returns userSearchObject  */
    getUserSearchData = (): Observable<UserParameters> => {
        return of(this.userSearchObject);
    }

    getApplicableLocations=(radius:number=500, position?: Position, totalDays?: number, byRoad?: any, calculatedExpenditure?: any): Observable<any> =>{

        /**
         * Configure to get the data from Database
         */
        const destinationsArray = [];
        const applicableLocations =[];
        this.globalDestinationsObject.forEach((ele) => {
          destinationsArray.push(ele.location);
        });
    
        let currentUserLocation;
        // const applicableLocations = [];
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
        });
        return of(applicableLocations);
      }
}