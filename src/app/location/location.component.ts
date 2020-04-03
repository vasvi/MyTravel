import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../model/search-criteria';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainerViewChild: ElementRef;
  map: google.maps.Map;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  targetLocation: Location;

  ngAfterViewInit() {
    this.initializeGoogleMap();
  }

  subscribeToRouterEvents() {
    this.activatedRoute.queryParams.subscribe((params: Location) => {
      if (params) {
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
      }
    })
  }

  plotNearbyPlaces() {
    const service = new google.maps.places.PlacesService(this.map);
    const targetCoordinates = new google.maps.LatLng(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);
    service.nearbySearch({
      location: targetCoordinates,
      radius: 12000
    }, (results, status) => {
      results.forEach((item) => {
        this.createMarker(item);
      })
    });
  }

  createMarker(data) {
    let marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: {
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng()
      },
      icon: {
        url: data.icon,
        scaledSize: new google.maps.Size(30, 30)
      }
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


  ngOnInit() {
    this.subscribeToRouterEvents();
  }

}
