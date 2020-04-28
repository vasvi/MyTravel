import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {GlobalSearchComponent} from './global-search.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SearchDataService} from '../services/search-data.serivce';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import * as googleData from '../mockData/google-mock-data';



@Injectable({
  providedIn: 'root'
})

export class SearchDataServiceMock {

  private applicableLocationsSubject = new Subject<any>();

  getApplicableLocations(radius, position) {
    this.applicableLocationsSubject.next({location: [{}], position: {}});
  }

  getApplicableLocationsSubs() {
    return this.applicableLocationsSubject.asObservable();
  }

  setUserSearchData() {

  }

  createLocationObject(location) {
    return JSON.parse(JSON.stringify(googleData.locationObject));
  }

  initSearch() {

  }
}

describe('GlobalSearchComponent', () => {
  let component: GlobalSearchComponent;
  let fixture: ComponentFixture<GlobalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalSearchComponent],
      imports: [RouterTestingModule.withRoutes([{
        path: 'location',
        component: GlobalSearchComponent
      }])],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire autoComplete Google', fakeAsync(() => {
    expect(component.locationInputViewChild.nativeElement).toBeTruthy();
    component.initAutoComplete();
    tick(300);
  }));
});
