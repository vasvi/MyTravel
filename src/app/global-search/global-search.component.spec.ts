import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GlobalSearchComponent } from './global-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchDataService } from '../services/search-data.serivce';
import { Subject } from 'rxjs';
import { Injectable, ElementRef } from '@angular/core';
import * as googleData from '../mockData/google-mock-data';
import { NO_ERRORS_SCHEMA } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SearchDataServiceMock {

  private applicableLocationsSubject = new Subject<any>();

  getApplicableLocations(radius, position) {
    this.applicableLocationsSubject.next({ location: [{}], position: {} });
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

xdescribe('GlobalSearchComponent', () => {
  let component: GlobalSearchComponent;
  let fixture: ComponentFixture<GlobalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([{
        path: 'location',
        component: GlobalSearchComponent
      }])],
      providers: [{ provide: SearchDataService, useClass: SearchDataServiceMock }]
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

  it('useMock should be true', fakeAsync(() => {
    tick(300);
    expect(component.useMock).toEqual(true);
  }))

  it('map shoud be disabled', () => {
    fixture.detectChanges();
    expect(component.locationInputViewChild).toBeFalsy();
  })

  it('should test mockLocations', () => {
    fixture.detectChanges();
    expect(component.mockLocations.length).toEqual(1);
  })

  // it('should test initAutoComplete', () => {
  //   component.useMock = false;
  //   expect(component.locationInputViewChild instanceof ElementRef).toEqual(true);
  // })

  it('should test showLocationBox', () => {
    component.showLocationBox();
    expect(component.displayLocations).toEqual(true);
  })

  it('should test hideLocationBox', () => {
    component.hideLocationBox();
    expect(component.displayLocations).toEqual(false);
  })

  it('should test redirect', () => {
    component.redirect({ name: 'abc' });
    expect(component.locationName).toEqual('abc');
    expect(component.displayLocations).toEqual(false);
  })

  describe('initAutoComplete', () => {

    beforeEach(() => {
      fixture.detectChanges();
    })

    it('should have locationInputViewChild', () => {
      component.useMock = false;
      fixture.detectChanges();
      expect(component.locationInputViewChild).toBeTruthy();
    })

    it('should instantiate google.maps.places AutoComplete', () => {
      spyOn(google.maps.places, 'Autocomplete');
      component.useMock = false;
      fixture.detectChanges()
      component.initAutoComplete();
      expect(google.maps.places.Autocomplete).toHaveBeenCalled();
    })

  })

});
