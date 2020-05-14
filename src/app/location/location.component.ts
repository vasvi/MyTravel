import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location, Place} from '../model/search-criteria';
import {Subscription} from 'rxjs';
import {WeatherService} from '../services/weather/weather.service';
import {WeatherDetails} from '../model/weather.model';
import {LocationService} from '../services/location/location.service';
import {environment} from '../../environments/environment';
import {PlacesMockService} from '../mock-services/places-mock/places-mock-service';
import {HttpService} from '../services/http/http.service';
import {GetUserInfo} from '../utilities';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) mapContainerViewChild: ElementRef;
  map: google.maps.Map;
  routerEventSubscription: Subscription;
  targetLocation: Location;
  places: Array<Place> = [];
  weatherDetails: WeatherDetails;
  useMap = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private locationService: LocationService,
    private placesMock: PlacesMockService,
    private http: HttpService
  ) {
    this.useMap = environment.useMap;
  }

  ngOnInit() {
    this.subscribeToRouterEvents();
    this.saveLocationHistory(this.targetLocation.place_id);
  }

  ngAfterViewInit() {
    if (this.useMap) {
      this.initializeGoogleMap();
    } else {
      this.plotMockPlaces();
    }
  }

  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }


  getWeatherDetails() {
    this.weatherService.getWeatherDetails({
      place_id: this.targetLocation.place_id,
      geometry: this.targetLocation.geometry
    })
      .subscribe((data: WeatherDetails) => {
        this.weatherDetails = data;
      });
  }

  subscribeToRouterEvents() {
    this.routerEventSubscription = this.activatedRoute.queryParams.subscribe((params: Location) => {
      if (params) {
        params = this.locationService.getLocationDetails();
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        if (this.useMap) {
          this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
        }
        this.getWeatherDetails();
      }
    });
  }

  plotMockPlaces() {
    const results: Array<any> = this.placesMock.getNearbyPlaces(this.targetLocation.place_id);
    const placesList: Array<Place> = [];
    results.forEach(item => {
      const placeObj: Place = this.locationService.createPlaceObj(item);
      placesList.push(placeObj);
    });
    setTimeout(() => {
      this.places = placesList;
    }, 0);
  }

  plotNearbyPlaces() {
    const service = this.locationService.createPlaceService(this.map);
    const targetCoordinates = this.locationService.createCoordinates(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
    service.nearbySearch({
      location: targetCoordinates,
      radius: 30000,
      type: 'tourist_attraction'
    }, (results, status) => {
      const placesList: Array<Place> = [];
      results.forEach((item) => {
        const placeObj: Place = this.locationService.createPlaceObj(item);
        placesList.push(placeObj);
        const markerOptions = this.locationService.createMarkerOptions(this.map, item);
        this.addMarker(markerOptions);
      });
      setTimeout(() => {
        this.places = placesList;
      }, 0);
    });
  }

  addMarker(options) {
    const marker = this.locationService.createMarker(options);
    const self = this;
    const infowindow = this.locationService.createInfoWindow({
      content: '<div>' + options.title + '</div>'
    });
    marker.addListener('click', function () {
      infowindow.open(self.map, marker);
    });
  }

  changeMapCenter(lat, lng) {
    if (this.map) {
      this.map.setCenter({lat, lng});
      this.plotNearbyPlaces();
    }
  }

  initializeGoogleMap() {
    this.map = this.locationService.createMap(this.mapContainerViewChild.nativeElement, {
      center: {
        lat: this.targetLocation.geometry[0],
        lng: this.targetLocation.geometry[1]
      },
      zoom: 12
    });
    this.plotNearbyPlaces();
  }

  saveLocationHistory(placeId: any) {

    const userInfo = GetUserInfo();
    if (userInfo.email) {

      const authToken = userInfo.idToken;

      const data = JSON.stringify({
        action: 'addLocationData',
        emailId: userInfo.email,
        locationData: placeId
      });
      const headers = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + authToken
      };


      this.http.makePostRequest(environment.CLOUDFUNCTIONS.baseURL + '/corsEnabledFunctionAuth', headers, data).subscribe((response) => {
        //console.log(response);
      });
    }
  }

}
