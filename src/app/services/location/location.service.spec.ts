import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });

  it('should test createInfoWindow', inject([LocationService], (service) => {
    expect(service.createInfoWindow({}) instanceof google.maps.InfoWindow).toEqual(true);
  }))

  it('should test createMap', inject([LocationService], (service) => {
    expect(service.createMap(document.createElement('div'), {}) instanceof google.maps.Map).toEqual(true);
  }))

  it('should test createMarker', inject([LocationService], (service) => {
    expect(service.createMarker({}) instanceof google.maps.Marker).toEqual(true);
  }))

  it('should test createCoordinates', inject([LocationService], (service) => {
    expect(service.createCoordinates(123, 123) instanceof google.maps.LatLng).toEqual(true);
  }))

  it('should test createPlaceService', inject([LocationService], (service) => {
    expect(service.createPlaceService(service.createMap(document.createElement('div'))) instanceof google.maps.places.PlacesService).toEqual(true);
  }))

  it('should test createPlaceObj', inject([LocationService], (service) => {
    let data = {
      name: 'Name',
      types: ['lodging'],
      photos: [{ getUrl: () => { return 'imageUrl' } }]
    }
    expect(service.createPlaceObj(data).imageUrl).toEqual('imageUrl');
  }))

  it('should test createMarkerOptions', inject([LocationService], (service) => {
    let data = {
      geometry: {
        location: {
          lat: () => { return 11.23 },
          lng: () => { return 22.34 }
        }
      },
      icon: 'icon',
      name: 'name'
    }
    expect(service.createMarkerOptions(service.createMap(document.createElement('div')), data).position.lat).toEqual(11.23);
}))

});
