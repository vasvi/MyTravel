import { Injectable, ElementRef } from '@angular/core';
import { Location, Place } from 'src/app/model/search-criteria';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationDetails: Location;
  constructor() { }

  setLocationsDetails(data: Location) {
    sessionStorage.setItem('targetLocation', JSON.stringify(data));
    this.locationDetails = data;
  }

  getLocationDetails(): Location {
    if (!this.locationDetails) {
      this.locationDetails = JSON.parse(sessionStorage.getItem('targetLocation'));
    }
    return this.locationDetails;
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

  createMarkerOptions(map: google.maps.Map, data) {
    let markerOptions = {
      map,
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

  createPlaceService(map: google.maps.Map) {
    return new google.maps.places.PlacesService(map);
  }

  createCoordinates(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  }

  createMarker(options) {
    return new google.maps.Marker(options);
  }

  createMap(element: ElementRef, options) {
    return new google.maps.Map(element.nativeElement, options);
  }

  createInfoWindow(options) {
    return new google.maps.InfoWindow(options);
  }

}
