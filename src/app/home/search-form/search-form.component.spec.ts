import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {SearchFormComponent} from './search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {RouterTestingModule} from '@angular/router/testing';
import {MatRadioModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {Subject} from 'rxjs';
import {SearchDataService} from '../../services/search-data.serivce';

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

  initSearch() {

  }
}

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const dummyData = {
    generalDetails: {
      person: 3,
      budget: 4000,
      duration: 2,
    },
    hotel: {
      starrating: '3 star',
    },
    travel: {
      travelmode: 'Two Wheeler',
      cartype: null,
      enginetype: null,
      bustype: null,
      trainclass: null
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatStepperModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    component.formArray.get('0').patchValue(dummyData.generalDetails);
    component.formArray.get('1').patchValue(dummyData.hotel);
    component.formArray.get('2').patchValue(dummyData.travel);
    component.onSubmit(new MouseEvent(''));
  });

  it('should create searchForm', () => {
    component.ngOnInit();
    expect(component.searchForm).toBeTruthy();
  });

  it('should use methods exposed by SearchDataService', inject([SearchDataServiceMock],
    (dataService: SearchDataServiceMock) => {

      component.userSearchObj = {
        person: 3,
        budget: 32003,
        duration: 3,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'Two Wheeler', cartype: '', enginetype: '', bustype: '', trainclass: ''}
      };

      dataService.getApplicableLocationsSubs().subscribe(data => {
        expect(data).toBeTruthy();
        component.getAvailableLocations(data);
        component.isEditMode = true;
        component.getAvailableLocations(data);
        data.location = [];
        component.getAvailableLocations(data);
        data.position = undefined;
        component.getAvailableLocations(data);
        data.location  = undefined;
        component.getAvailableLocations(data);
      });
      dataService.getApplicableLocations(5000, null);
    }));

  it('should check for pre-filled form', () => {

    let formDataArray = [{
      'person': 3,
      'budget': 30000,
      'duration': 3,
      'hotel': {'starrating': '2 star'},
      'travel': {'travelmode': 'bus', 'cartype': '', 'enginetype': '', 'bustype': '', 'trainclass': ''}
    },
      {
        'person': 3,
        'budget': 30000,
        'duration': 3,
        'hotel': {'starrating': '2 star'},
        'travel': {'travelmode': 'two wheeler', 'cartype': '', 'enginetype': '', 'bustype': '', 'trainclass': ''}
      },
      {
        'person': 3,
        'budget': 30000,
        'duration': 3,
        'hotel': {'starrating': '2 star'},
        'travel': {'travelmode': 'Four Wheeler', 'cartype': '', 'enginetype': '', 'bustype': '', 'trainclass': ''}
      }, {
        'person': 3,
        'budget': 30000,
        'duration': 3,
        'hotel': {'starrating': '2 star'},
        'travel': {'travelmode': 'train', 'cartype': '', 'enginetype': '', 'bustype': '', 'trainclass': ''}
      }];

    formDataArray = JSON.parse(JSON.stringify(formDataArray));
    for (const formData of formDataArray) {
      component.formData = formData;
      component.ngOnInit();
    }

  });

  it('should validate form ands should set and get details', () => {
    const generalDetails = {
      person: 3,
      budget: 4000,
      duration: 2,
    };
    const hotel = {
      starrating: '3 star',
    };
    const travel = {
      travelmode: 'Two Wheeler',
      cartype: null,
      enginetype: null,
      bustype: null,
      trainclass: null
    };

    component.formArray.get('0').patchValue(generalDetails);
    component.formArray.get('1').patchValue(hotel);
    component.formArray.get('2').patchValue(travel);

    expect(component.travelmode).toBeTruthy();
    expect(component.hotelData).toBeTruthy();
    expect(component.generalDetails).toBeTruthy();
    expect(component.travelDetails).toBeTruthy();

    expect(component.formArray.valid).toBeTruthy();

  });


  it('should test optionChanged', () => {

    const form = component.formArray.get('2');
    component.optionChanged({value: 'bus'});
    component.optionChanged({value: 'two wheeler'});
    component.optionChanged({value: 'Four Wheeler'});
    component.optionChanged({value: 'train'});
    form.patchValue({
      travelmode: 'bus',
      cartype: null,
      enginetype: null,
      bustype: null,
      trainclass: null
    });
    expect(form.valid).toBeFalsy();
  });
});
