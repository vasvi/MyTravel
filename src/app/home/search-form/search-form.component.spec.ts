import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatStepperModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatRadioModule, MatSnackBarModule } from '@angular/material';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from '../home.component';
import { AboutComponent } from 'src/app/about/about.component';
import { SearchComponent } from 'src/app/search/search.component';
import { LocationComponent } from 'src/app/location/location.component';
import { SearchListComponent } from 'src/app/search/search-list/search-list.component';
import { MapViewComponent } from 'src/app/search/map-view/map-view.component';
import { NgxMasonryComponent } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchFormComponent,
        HomeComponent,
        AboutComponent,
        SearchComponent,
        LocationComponent,
        SearchListComponent,
        MapViewComponent,
        NgxMasonryComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatStepperModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        AppRoutingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
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

  it('should create searchForm', () => {
    component.ngOnInit();
    expect(component.searchForm).toBeTruthy();
  });

  // it('should not submit invalid form', () => {
  // })

  it('form should be valid', () => {
    let generalDetails = {
      person: 3,
      budget: 4000,
      duration: 2,
    }
    let hotel = {
      starrating: '3 star',
    };
    let travel = {
      travelmode: 'Two Wheeler',
      cartype: null,
      enginetype: null,
      bustype: null,
      trainclass: null
    }

    component.formArray.get('0').patchValue(generalDetails);
    component.formArray.get('1').patchValue(hotel);
    component.formArray.get('2').patchValue(travel);

    expect(component.formArray.valid).toBeTruthy();

  })

  it('should test optionChanged', () => {

    let form = component.formArray.get('2');
    component.optionChanged({ value: 'bus' });
    form.patchValue({
      travelmode: 'bus',
      cartype: null,
      enginetype: null,
      bustype: null,
      trainclass: null
    })
    expect(form.valid).toBeFalsy();
  })
});
