import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, Place } from '../model/search-criteria';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';
import { WeatherDetails } from '../model/weather.model';
import { LocationService } from '../services/location/location.service';
import { environment } from '../../environments/environment';
import { PlacesMockService } from '../mock-services/places-mock/places-mock-service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainerViewChild: ElementRef;
  map: google.maps.Map;
  routerEventSubscription: Subscription;
  targetLocation: Location;
  places: Array<Place> = [];
  weatherDetails: WeatherDetails;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private locationService: LocationService,
    private placesMock: PlacesMockService
  ) { }

  ngOnInit() {
    this.subscribeToRouterEvents();
  }

  ngAfterViewInit() {
    this.initializeGoogleMap();
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
      })
  }

  subscribeToRouterEvents() {
    this.routerEventSubscription = this.activatedRoute.queryParams.subscribe((params: Location) => {
      if (params) {
        params = this.locationService.getLocationDetails();
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
        this.getWeatherDetails();
      }
    })
  }

  plotMockPlaces() {
    var results: Array<any> = this.placesMock.getNearbyPlaces(this.targetLocation.place_id);
    var placesList: Array<Place> = [];
    results.forEach(item => {
      let placeObj: Place = this.locationService.createPlaceObj(item);
      placesList.push(placeObj);
      let markerOptions = this.locationService.createMarkerOptions(this.map, item);
      this.addMarker(markerOptions);
    });
    this.places = placesList;
  }

  plotNearbyPlaces() {
    if (environment.useMock) {
      this.plotMockPlaces();
      return;
    }
    const service = this.locationService.createPlaceService(this.map);
    const targetCoordinates = this.locationService.createCoordinates(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
    service.nearbySearch({
      location: targetCoordinates,
      radius: 30000,
      type: 'tourist_attraction'
    }, (results, status) => {
      var placesList: Array<Place> = [];
      results.forEach((item) => {
        let placeObj: Place = this.locationService.createPlaceObj(item);
        placesList.push(placeObj);
        let markerOptions = this.locationService.createMarkerOptions(this.map, item);
        this.addMarker(markerOptions);
      })
      this.places = placesList;
    });
  }

  addMarker(options) {
    let marker = this.locationService.createMarker(options);
    let self = this;
    var infowindow = this.locationService.createInfoWindow({
      content: '<div>' + options.title + '</div>'
    });
    marker.addListener('click', function () {
      infowindow.open(self.map, marker);
    });
  }

  changeMapCenter(lat, lng) {
    if (this.map) {
      this.map.setCenter({ lat, lng });
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

}
