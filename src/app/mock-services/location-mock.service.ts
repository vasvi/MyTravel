import { Injectable, ElementRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocationServiceMock {
    private locationDetails = {
        name: 'Chandigarh',
        formatted_address: 'Chandigarh, India',
        photos: ['https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAdue4G9JNfjp1QfierjRh863zpYxoBuHeoUYTyqtIRq-hIOxzewWO6Uw9PM78EJ2Z6DPPvQbMuMDOvwPausCarBmvm1IoiORhXha5TDxzElesc7zWvioz-NjD3Pcu9aLhEhDVeF2bTkCAta7aR4lx0ngrGhT8CwwjuS9E8lTvUZKU6itmFUJnmw&3u1440&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=82258'],
        id: '2ff3ad0666fc5f99d36aa80f35cf1e9d61ade100',
        place_id: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
        reference: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
        geometry: [30.7333148, 76.7794179]
    };
    constructor() { }

    setLocationsDetails() {}

    getLocationDetails() {
        return this.locationDetails;
    }

    createPlaceObj() {
        let placeObj = {
            name: 'name',
            imageUrl: 'imageurl',
            types: [''],
            rating: 5
        }
        return placeObj;
    }

    createMarkerOptions(map, data) {
        let markerOptions = {
            map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {
                lat: 33.412,
                lng: 24.1231
            },
            icon: {
                url: 'icon',
                scaledSize: new google.maps.Size(30, 30)
            },
            title: 'name'
        }
        return markerOptions;
    }

    createPlaceService(map) {
        return new google.maps.places.PlacesService(map);
    }

    createCoordinates(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }

    createMarker(options) {
        return new google.maps.Marker(options);
    }

    createMap(element, options) {
        return new google.maps.Map(element, options);
    }

    createInfoWindow(options) {
        return new google.maps.InfoWindow(options);
    }

}
