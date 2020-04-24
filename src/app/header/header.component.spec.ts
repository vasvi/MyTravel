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


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  (window as any).google = {
    maps: {
      places: {
        Autocomplete: function (element) {
          this.getPlace = () => {
            return JSON.parse(JSON.stringify({
              'address_components': [{
                'long_name': 'Noida',
                'short_name': 'Noida',
                'types': ['locality', 'political']
              }, {
                'long_name': 'Gautam Buddh Nagar',
                'short_name': 'Gautam Buddh Nagar',
                'types': ['administrative_area_level_2', 'political']
              }, {
                'long_name': 'Uttar Pradesh',
                'short_name': 'UP',
                'types': ['administrative_area_level_1', 'political']
              }, {'long_name': 'India', 'short_name': 'IN', 'types': ['country', 'political']}],
              'adr_address': '<span class="locality">Noida</span>, <span class="region">Uttar Pradesh</span>, <span class="country-name">India</span>',
              'formatted_address': 'Noida, Uttar Pradesh, India',
              'geometry': {
                'location': {'lat': 28.5355161, 'lng': 77.3910265},
                'viewport': {'south': 28.397206, 'west': 77.2936967, 'north': 28.6363011, 'east': 77.50256329999999}
              },
              'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
              'id': '4838d8e111df81c1f66479871208c0afc03e657d',
              'name': 'Noida',
              'photos': [{
                'height': 768,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/113860657786379706054">Venkatesh Bhat</a>'],
                'width': 1024
              }, {
                'height': 621,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/116339547022326993172">arvind kumar</a>'],
                'width': 735
              }, {
                'height': 3024,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/105784490073967401958">Siddharth Kardam</a>'],
                'width': 4032
              }, {
                'height': 3120,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/115459302801745116757">Rakesh Kumar</a>'],
                'width': 4160
              }, {
                'height': 394,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100923482555300293907">Funky Amit</a>'],
                'width': 778
              }, {
                'height': 2736,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/116229981104704942230">Ashish Saini</a>'],
                'width': 3648
              }, {
                'height': 3024,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/107431011022399597526">Shwet Kumar</a>'],
                'width': 4032
              }, {
                'height': 547,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100068170437916889514">Shloka Sharma</a>'],
                'width': 835
              }, {
                'height': 838,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100145096851934740288">Alok S</a>'],
                'width': 1404
              }, {
                'height': 2448,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/104199291664368182675">Camera Girl Harshita</a>'],
                'width': 3264
              }],
              'place_id': 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
              'reference': 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
              'scope': 'GOOGLE',
              'types': ['locality', 'political'],
              'url': 'https://maps.google.com/?q=Noida,+Uttar+Pradesh,+India&ftid=0x390ce5a43173357b:0x37ffce30c87cc03f',
              'utc_offset': 330,
              'vicinity': 'Noida',
              'html_attributions': [],
              'utc_offset_minutes': 330
            }));
          };
          return this;
        }
      },
      event: {
        addListener: (param, eventName, callback) => {
          callback();
        }
      },
      GeocoderStatus: {
        OK: 'OK'
      }

    }
  };


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
