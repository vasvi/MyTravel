import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, Place } from '../model/search-criteria';
import { Subscription } from 'rxjs';

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
  carouselItems: Array<string>;
  currentCarouselIndex: number;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.initializeGoogleMap();
  }

  subscribeToRouterEvents() {
    this.routerEventSubscription = this.activatedRoute.queryParams.subscribe((params: Location) => {
      if (params) {
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
        this.createCarousel();
      }
    })
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
        let placeObj: Place = {
          name: item.name,
          imageUrl: (() => {
            return Array.isArray(item.photos) ? item.photos[0].getUrl({
              maxHeight: 400,
              maxWidth: 300
            }) : null;
          })(),
          types: item.types,
          rating: item.rating
        }
        placesList.push(placeObj);
        let markerOptions = {
          map: this.map,
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: {
            lat: item.geometry.location.lat(),
            lng: item.geometry.location.lng()
          },
          icon: {
            url: item.icon,
            scaledSize: new google.maps.Size(30, 30)
          },
          title: item.name
        }
        this.createMarker(markerOptions);
      })
      this.places = placesList;
      console.log(this.places)
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
      zoom: 15
    });
    this.plotNearbyPlaces();
  }

  createCarousel() {
    this.carouselItems = this.targetLocation.photos;
    this.currentCarouselIndex = 0;
  }

  navigateNext() {
    this.currentCarouselIndex = this.currentCarouselIndex === this.carouselItems.length ? 0 : this.currentCarouselIndex + 1
  }

  navigatePrev() {
    this.currentCarouselIndex = this.currentCarouselIndex === 0 ? this.carouselItems.length : this.currentCarouselIndex - 1
  }

  ngOnInit() {
    this.subscribeToRouterEvents();
  }

}
