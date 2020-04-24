import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {SearchDataService} from '../services/search-data.serivce';
import {Observable, Subject} from 'rxjs';
import {MapService} from '../services/map/map.service';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Position} from '../model/search-criteria';
import * as constant from '../searchConstants';

@Injectable({
  providedIn: 'root'
})

export class SearchDataServiceMock {

  private applicableLocationsSubject = new Subject<any>();

  getApplicableLocations(radius, position) {
    this.applicableLocationsSubject.next({location: [{}], position: {}});
    this.applicableLocationsSubject.next({location: [{}], position: undefined});
  }

  getApplicableLocationsSubs() {
    return this.applicableLocationsSubject.asObservable();
  }

  setUserSearchData() {

  }

  createLocationObject(location) {

  }

  initSearch() {

  }

  getPosition(callback) {
    const defaultPosition: Position = {
      coords: {
        latitude: constant.searchConstants.defaultLocation.latitude,
        longitude: constant.searchConstants.defaultLocation.longitude
      }
    };
    callback(defaultPosition);
  }
}


@Injectable({
  providedIn: 'root'
})

export class MapServiceMock {
  userLocationChangeEmitter: Subject<any> = new Subject();

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


xdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}, {
        provide: MapService,
        useClass: MapServiceMock
      }],
      imports: [MatDialogModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.locationInputViewChild = component.locationInputViewChild || {
      nativeElement: null
    };
    expect(component).toBeTruthy();
  });

  it('should call onManualLocationClicked', () => {
    component.locationInputViewChild = component.locationInputViewChild || {
      nativeElement: null
    };
    const event = new MouseEvent('');
    component.onManualLocationClicked(event);
  });

  it('should call initAutoComplete and setLocation Manually', fakeAsync(() => {
    component.locationInputViewChild = component.locationInputViewChild || {
      nativeElement: null
    };
    component.initAutoComplete();
    tick(300);
    expect(component.newUserLocationObject).toBeTruthy();
    component.newUserLocationObject.geometry = {
      location: {
        lat: () => {
        },
        lng: () => {
        }
      }
    };
    component.setManualLocation();
    expect(component.currentLocation).toBeTruthy();
  }));

});
