import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as Constant from '../searchConstants';
import {SearchDataService} from '../services/search-data.serivce';
import {MapService} from '../services/map/map.service';
import {Position} from '../model/search-criteria';


@Injectable({
  providedIn: 'root'
})

export class SearchDataServiceMock {

  private applicableLocationsSubject = new Subject<any>();

  getApplicableLocations(radius, position) {
    this.applicableLocationsSubject.next({location: [{}]});
  }

  getApplicableLocationsSubs() {
    return this.applicableLocationsSubject.asObservable();
  }

  getPosition(callback) {
    const defaultPosition: Position = {
      coords: {
        latitude: Constant.searchConstants.defaultLocation.latitude,
        longitude: Constant.searchConstants.defaultLocation.longitude
      }
    };
    callback(defaultPosition);
  }
}


@Injectable({
  providedIn: 'root'
})

export class MapServiceMock {
  userLocationChangeEmitter: Subject<any> = new BehaviorSubject(0);

  reverseGeoCode(lat, long) {

    return new Observable((obs) => {
      obs.next({
        results: [{
          types: ['locality'],
          address_components: [{short_name: ''}]
        }],
        status: 'OK',
      });
    });
  }


}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}, {
        provide: MapService,
        useClass: MapServiceMock
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should Init search for popular locations', () => {

    const position = {
      coords:
        {latitude: 32, longitude: -96}
    };
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
      arguments[0](position);
    });
    component.initSearchForPopularLocations();
  });


  it('Should Init search for error in  user location', inject([SearchDataServiceMock],
    (dataService: SearchDataServiceMock) => {

      const defaultPosition = {
        coords: {
          latitude: Constant.searchConstants.defaultLocation.latitude,
          longitude: Constant.searchConstants.defaultLocation.longitude
        }
      };

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        arguments[1](Error);
      });

      component.initSearchForPopularLocations();
      dataService.getApplicableLocationsSubs().subscribe((response) => {
        component.getPopularLocations(response);
        expect(response).toBeTruthy();
      });
      dataService.getApplicableLocations(2500, defaultPosition);

    }));


});

