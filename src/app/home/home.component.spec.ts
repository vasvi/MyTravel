import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {Subject} from 'rxjs';
import * as Constant from '../searchConstants';
import {SearchDataService} from '../services/search-data.serivce';


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
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}]
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


  it('Should Init search for popular locations', inject([SearchDataServiceMock],
    (dataService: SearchDataServiceMock) => {

      const position = {
        coords:
          {latitude: 32, longitude: -96}
      };
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        arguments[0](position);
      });

      component.initSearchForPopularLocations();
      dataService.getApplicableLocationsSubs().subscribe((response) => {
        component.getPopularLocations(response);
        expect(response).toBeTruthy();
      });
      dataService.getApplicableLocations(2500, position);

    }));

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

