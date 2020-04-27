import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, Place } from '../model/search-criteria';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';
import { WeatherDetails } from '../model/weather.model';

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
    private weatherService: WeatherService
  ) { }

  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.initializeGoogleMap();
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
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
        this.getWeatherDetails();
      }
    })
  }

  createPlaceObj(data): Place {
    let placeObj: Place = {
      name: data.name,
      imageUrl: (() => {
        return Array.isArray(data.photos) ? data.photos[0].getUrl({
          maxHeight: 400,
          maxWidth: 300
        }) : null;
      })(),
      types: data.types,
      rating: data.rating
    }

    return placeObj;
  }

  createMarkerOptions(data) {
    let markerOptions = {
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: {
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng()
      },
      icon: {
        url: data.icon,
        scaledSize: new google.maps.Size(30, 30)
      },
      title: data.name
    }
    return markerOptions;
  }

  plotNearbyPlaces() {
    const service = new google.maps.places.PlacesService(this.map);
    const targetCoordinates = new google.maps.LatLng(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
    service.nearbySearch({
      location: targetCoordinates,
      radius: 30000,
      type: 'tourist_attraction'
    }, (results, status) => {
      var placesList: Array<Place> = [];
      results.forEach((item) => {
        let placeObj: Place = this.createPlaceObj(item);
        placesList.push(placeObj);
        let markerOptions = this.createMarkerOptions(item);
        this.createMarker(markerOptions);
      })
      this.places = placesList;
    });
  }

  createMarker(options) {
    let marker = new google.maps.Marker(options);
    let self = this;
    var infowindow = new google.maps.InfoWindow({
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
    this.map = new google.maps.Map(this.mapContainerViewChild.nativeElement, {
      center: {
        lat: this.targetLocation.geometry[0],
        lng: this.targetLocation.geometry[1]
      },
      zoom: 12
    });
    this.plotNearbyPlaces();
  }


  ngOnInit() {
    this.subscribeToRouterEvents();
  }

}
