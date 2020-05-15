import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {SearchDataService} from '../services/search-data.serivce';
import {Observable, Subject, of} from 'rxjs';
import {MapService} from '../services/map/map.service';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Position} from '../model/search-criteria';
import {RouterTestingModule} from '@angular/router/testing';
import * as constant from '../searchConstants';
import {environment} from '../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule} from '@angular/material';
import { EventsService } from '../services/events/events.service';



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
          address_components: [{short_name: 'Noida'}]
        }],
        status: 'OK',
      });
    });
  }
}


fdescribe('HeaderComponent', () => {
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
      imports: [MatSnackBarModule, HttpClientTestingModule,MatDialogModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])]
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

  it('should setLocation Manually', fakeAsync(() => {
    component.newUserLocationObject = {
      formatted_address: 'Noida',
      geometry: {
        location: {
          lat: () => {
            return 28;
          },
          lng: () => {
            return 84;
          }
        }
      }
    };
    component.setManualLocation();
    tick(1000);
    expect(component.currentLocation).toBeTruthy();
  }));

  it('Should mock google autocomplete', () => {
    component.locationInputViewChild = component.locationInputViewChild || {
      nativeElement: null
    };
    spyOn(google.maps.event, 'addListener').and.callFake((param1, param2, callback) => {
      /**
       * ::TODO
       */
      callback();
      return null;
    });
    component.initAutoComplete();
  });

  it('Should Call ngDestroy', () => {
    component.ngOnDestroy();
  });

  it('should shareData', () => {
    sessionStorage.setItem('userinfo', '{"authToken": "1"}');
    const eventService: EventsService = TestBed.get(EventsService);
    // spyOn(eventService, 'createSpreadSheet').and.returnValue(of({spreadsheetId:"1234"}));
    spyOn(eventService, 'createSpreadSheet').and.callFake(() => {
      return of({spreadsheetId:"1234"});
    });
    component.shareData();
    expect(eventService.createSpreadSheet).toHaveBeenCalled();
  });
});
