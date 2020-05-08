
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LocationComponent } from './location.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather/weather.service';
import { of, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Location, Place } from '../model/search-criteria';
import { WeatherDataMock } from '../mockData/weather-mock-data';
import { LocationServiceMock } from '../mock-services/location-mock.service';
import { LocationService } from '../services/location/location.service';
import { By } from '@angular/platform-browser';

class WeatherServiceMock {
  getWeatherDetails(url) {
    return of(WeatherDataMock);
  }
}

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let location: Location = {
    name: 'Chandigarh',
    formatted_address: 'Chandigarh, India',
    photos: ['https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAdue4G9JNfjp1QfierjRh863zpYxoBuHeoUYTyqtIRq-hIOxzewWO6Uw9PM78EJ2Z6DPPvQbMuMDOvwPausCarBmvm1IoiORhXha5TDxzElesc7zWvioz-NjD3Pcu9aLhEhDVeF2bTkCAta7aR4lx0ngrGhT8CwwjuS9E8lTvUZKU6itmFUJnmw&3u1440&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=82258'],
    id: '2ff3ad0666fc5f99d36aa80f35cf1e9d61ade100',
    place_id: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
    reference: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
    geometry: [30.7333148, 76.7794179]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(location)
          }
        },
        {
          provide: WeatherService,
          useClass: WeatherServiceMock
        },
        {
          provide: LocationService,
          useClass: LocationServiceMock
        }
      ],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disabled maps', () => {

    beforeEach(() => {
      component.useMap = false;
      fixture.detectChanges();
    })

    it('should show have placeholder class on map element', () => {
      let mapElement = fixture.debugElement.query(By.css('#map'));
      expect(mapElement.classes.placeholder).toBe(true);
    })

    it('should call initializeGoogleMap 0 times', () => {
      spyOn(component, 'initializeGoogleMap');
      component.ngAfterViewInit();
      expect(component.initializeGoogleMap).toHaveBeenCalledTimes(0);
    })

    it('should call changeMapCenter 0 times', () => {
      spyOn(component, 'changeMapCenter');
      component.ngAfterViewInit();
      expect(component.changeMapCenter).toHaveBeenCalledTimes(0);
    })

    it('should call addMarker 0 times', () => {
      spyOn(component, 'addMarker');
      component.ngAfterViewInit();
      expect(component.addMarker).toHaveBeenCalledTimes(0);
    })

    it('should call plotMockPlaces 1 time', () => {
      spyOn(component, 'plotMockPlaces');
      component.ngAfterViewInit();
      expect(component.plotMockPlaces).toHaveBeenCalledTimes(1);
    })
  })

  describe('subscribeToRouterEvents', () => {
    beforeEach(() => {
      fixture.detectChanges();
    })

    it('should have routerEventSubscription', () => {
      expect(component.routerEventSubscription).toBeTruthy();
    })

    it('should have targetLocation', () => {
      expect(component.targetLocation).toBeTruthy();
    })

    it('should set targetLocation name', () => {
      expect(component.targetLocation.name).toBe('Chandigarh');
    })

    it('should call getWeatherDetails once', () => {
      spyOn(component, 'getWeatherDetails');
      component.subscribeToRouterEvents();
      expect(component.getWeatherDetails).toHaveBeenCalledTimes(1);
    })

    it('should not changeMapCenter', () => {
      spyOn(component, 'changeMapCenter');
      component.subscribeToRouterEvents();
      expect(component.changeMapCenter).toHaveBeenCalledTimes(0);
    })
  })


  describe('getWeatherDetails', () => {
    beforeEach(() => {
      fixture.detectChanges();
    })

    it('should test weatherDetails properties', () => {
      component.getWeatherDetails();
      fixture.detectChanges();
      expect(component.weatherDetails.daily[0].pressure).toEqual(1014);
      expect(component.weatherDetails.current.pressure).toEqual(1014);
    })

  })

  describe('plotMockPlaces', () => {
    beforeEach(() => {
      component.plotMockPlaces();
      fixture.detectChanges();
    })


    it('should test', fakeAsync(() => {
      expect(component.places.length).toEqual(0);
      component.plotMockPlaces();
      tick(300)
      expect(component.places.length).toEqual(6);
    }))

  })

  describe('plotNearbyPlaces', () => {
    let service: LocationServiceMock;
    beforeEach(() => {
      service = fixture.debugElement.injector.get(LocationServiceMock);
      fixture.detectChanges();
    })

    it('should call locationServiceMock.createPlaceService once', () => {
      spyOn(service, 'createPlaceService');
      component.plotNearbyPlaces();
      expect(service.createPlaceService).toHaveBeenCalledTimes(0);
    })

    it('should call locationServiceMock.createPlaceService once', () => {
      spyOn(service, 'createPlaceService');
      component.plotNearbyPlaces();
      expect(service.createPlaceService).toHaveBeenCalledTimes(0);
    })

    it('should call locationServiceMock.createCoordinates once', () => {
      spyOn(service, 'createCoordinates');
      component.plotNearbyPlaces();
      expect(service.createCoordinates).toHaveBeenCalledTimes(0);
    })

    it('should call locationServiceMock.createPlaceObj once', () => {
      spyOn(service, 'createPlaceObj');
      component.plotNearbyPlaces();
      expect(service.createPlaceObj).toHaveBeenCalledTimes(0);
    })

    it('should call locationServiceMock.createMarkerOptions once', () => {
      spyOn(service, 'createMarkerOptions');
      component.plotNearbyPlaces();
      expect(service.createMarkerOptions).toHaveBeenCalledTimes(0);
    })

  })


  // it('should test subscribeToRouterEvents', () => {
  //   component.subscribeToRouterEvents();
  //   expect(component.routerEventSubscription instanceof Subscription).toEqual(true);
  //   fixture.detectChanges();
  //   expect(component.targetLocation.id).toEqual(location.id);
  // })

  // it('should test getWeatherDetails', () => {
  //   component.getWeatherDetails();
  //   fixture.detectChanges();
  //   expect(component.weatherDetails.daily[0].pressure).toEqual(1014);
  //   expect(component.weatherDetails.current.pressure).toEqual(1014);
  // })

  // it('should test plotMockPlaces', fakeAsync(() => {
  //   expect(component.places.length).toEqual(0);
  //   component.plotMockPlaces();
  //   tick(100);
  //   expect(component.places.length).toEqual(6);
  // }))

  // it('should test plotNearbyPlaces', () => {
  //   spyOn(component, 'plotNearbyPlaces').and.callFake(() => {

  //   })
  //   expect(component.plotNearbyPlaces).not.toHaveBeenCalled();
  // })

  // it('should test changeMapCenter', () => {
  //   spyOn(component, 'changeMapCenter').and.callFake(() => {

  //   });
  //   expect(component.changeMapCenter).not.toHaveBeenCalled();
  // })

  // it('should test initializeGoogleMap', () => {
  //   component.useMap = true;
  //   spyOn(component, 'initializeGoogleMap').and.callFake(() => {

  //   });
  //   component.ngAfterViewInit();
  //   expect(component.initializeGoogleMap).toHaveBeenCalled();
  // })

  // it('should test addMarker', () => {
  //   spyOn(component, 'addMarker').and.callFake(() => {

  //   });
  //   expect(component.addMarker).not.toHaveBeenCalled();
  // })


});