import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LocationComponent } from './location.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather/weather.service';
import { of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Location, Place } from '../model/search-criteria';
import { WeatherDataMock } from '../mockData/weather-mock-data';

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
          provide: ActivatedRoute, useValue: {
            queryParams: of(location)
          }
        }, {
          provide: WeatherService,
          useClass: WeatherServiceMock
        }, MatDialog
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

  it('should test subscribeToRouterEvents', () => {
    component.subscribeToRouterEvents();
    expect(component.routerEventSubscription instanceof Subscription).toEqual(true);
    fixture.detectChanges();
    expect(component.targetLocation.id).toEqual(location.id);
  })

  it('should test getWeatherDetails', () => {
    component.getWeatherDetails();
    fixture.detectChanges();
    expect(component.weatherDetails.daily[0].pressure).toEqual(1014);
    expect(component.weatherDetails.current.pressure).toEqual(1014);
  })

  it('should test createPlaceObj', () => {
    let data = {
      name: location.name,
      types: ['lodging'],
      photos: [{ getUrl: () => { return location.photos[0] } }]
    }
    expect(component.createPlaceObj(data).imageUrl).toEqual(location.photos[0]);
  })

  it('should test createMarkerOptions', () => {
    let data = {
      geometry: {
        location: {
          lat: () => {return location.geometry[0]},
          lng: () => {return location.geometry[1]}
        }
      },
      icon: location.photos[0],
      name: location.name
    }
    expect(component.createMarkerOptions(data).position.lat).toEqual(location.geometry[0])
  })

});
