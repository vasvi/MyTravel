import { Component, EventEmitter, OnInit, OnDestroy, Input, Output, NgZone } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { UserParameters, ApplicableLocationObject } from '../../model/search-criteria';
import { SearchDataService } from '../../services/search-data.serivce';
import * as Constants from '../../searchConstants';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { GetUserInfo } from 'src/app/utilities';
import { SearchHistoryService } from 'src/app/services/search-history/search-history.service';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Input() formData: UserParameters;
  @Output() locationDataChange = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private searchDataService: SearchDataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private translate: TranslateService,
    private searchHistoryService: SearchHistoryService) {
    translate.setDefaultLang('en');
  }

  searchForm: FormGroup;
  availableLocationSubs: Subscription;
  userSearchObj: UserParameters;
  isEditMode = false;

  /**Form getters */
  get formArray(): AbstractControl | null {
    return this.searchForm.get('formArray');
  }

  get travelmode(): string {
    return this.formArray.get('2').get('travelmode') && this.formArray.get('2').get('travelmode').value;
  }

  get hotelData(): Object {
    return this.formArray.get('1') && this.formArray.get('1').value;
  }

  get generalDetails(): Object {
    return this.formArray.get('0') && this.formArray.get('0').value;
  }

  get travelDetails(): Object {
    return this.formArray.get('2') && this.formArray.get('2').value;
  }

  hotelRatingOptions = [
    { value: Constants.hotelRatingType.twostar },
    { value: Constants.hotelRatingType.threestar },
    { value: Constants.hotelRatingType.fourstar },
    { value: Constants.hotelRatingType.fivestar },
  ];

  travelTypeOptions = [
    { value: Constants.travelMode.twowheeler },
    { value: Constants.travelMode.fourwheeler },
    { value: Constants.travelMode.bus },
    { value: Constants.travelMode.train },
    { value: Constants.travelMode.flight }
  ];

  busTypeOptions = [
    { value: Constants.busType.ac },
    { value: Constants.busType.nonac },
    { value: Constants.busType.volvo }
  ];

  engineTypeOptions = [
    { value: Constants.engineType.petrol },
    { value: Constants.engineType.diesel }
  ];

  trainTypeOptions = [
    { value: Constants.trainType.firstclass },
    { value: Constants.trainType.secondclass },
    { value: Constants.trainType.thirdclass },
    { value: Constants.trainType.fourthclass }
  ];

  carTypeOptions = [
    { value: Constants.carType.hatchback },
    { value: Constants.carType.sedan },
    { value: Constants.carType.suv },
  ];

  ngOnInit() {
    this.searchForm = this.createFormGroup();

    // Check if the form is in edit mode
    if (this.formData) {
      this.isEditMode = true;
      this.prefillForm(this.formData);
    }

    this.availableLocationSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => this.getAvailableLocations(data));
  }

  ngOnDestroy() {
    if (this.availableLocationSubs) {
      this.availableLocationSubs.unsubscribe();
    }
  }

  createFormGroup = () => {
    return this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          person: ['', Validators.required],
          budget: ['', Validators.required],
          duration: ['', Validators.required],
        }),
        this._formBuilder.group({
          starrating: ['', Validators.required],
        }),
        this._formBuilder.group({
          travelmode: ['', [Validators.required]],
          cartype: [''],
          enginetype: [''],
          bustype: [''],
          trainclass: ['']
        })
      ])
    });
  }

  prefillForm = (formdata: UserParameters) => {
    console.log(this.generalDetails);
    // general details
    this.formArray.get('0').get('person').setValue(this.formData.person);
    this.formArray.get('0').get('budget').setValue(this.formData.budget);
    this.formArray.get('0').get('duration').setValue(this.formData.duration);

    // hotel details
    this.formArray.get('1').get('starrating').setValue(this.formData.hotel.starrating);

    // travel details
    let travelForm = this.formArray.get('2');
    travelForm.get('travelmode').setValue(this.formData.travel.travelmode);

    switch (this.formData.travel.travelmode) {
      case Constants.travelMode.bus:
        travelForm.get('bustype').setValue(this.formData.travel.bustype);
        break;
      case Constants.travelMode.train:
        travelForm.get('trainclass').setValue(this.formData.travel.trainclass);
        break;
      case Constants.travelMode.fourwheeler:
        travelForm.get('cartype').setValue(this.formData.travel.cartype);
        travelForm.get('enginetype').setValue(this.formData.travel.enginetype);
        break;
      default:
        break;
    }
    this.userSearchObj = this.formData;
  }

  getAvailableLocations = (data: ApplicableLocationObject | any) => {
    if (this.userSearchObj) {
      if (data.location && data.location.length && data.position) {
        if (!this.isEditMode) {
          this.zone.run(() => this.router.navigate(['search']));
        } else
          this.locationDataChange.emit();
      } else if (this.userSearchObj && data.location && !data.location.length) {
        this.snackBar.open('Budget too low', '', { duration: 5000 });
      } else {
        this.snackBar.open(data, '', { duration: 5000 });
      }
    }
  }

  onSubmit = (event: MouseEvent) => {
    event.stopPropagation();

    let obj = {};

    Object.assign(obj, this.generalDetails);

    Object.assign(obj, {
      hotel: Object.assign({}, this.hotelData)
    });

    Object.assign(obj, {
      travel: Object.assign({}, this.travelDetails)
    });

    this.userSearchObj = obj as UserParameters;

    //TODO: Add user data validation before initiating search
    this.searchDataService.setUserSearchData(this.userSearchObj);
    this.searchDataService.initSearch(this.userSearchObj);
    this.saveUserSearch(this.userSearchObj);
  }

  saveUserSearch(data) {
    let user = GetUserInfo();
    if (!user) return;
    let payload = {
      emailId: user.email,
      locationData: JSON.stringify(data)
    }
    this.searchHistoryService.saveSearch(payload)
    .subscribe(data => {
      console.log('search record saved !!!');
    }, err => {
      console.log(err);
    })
  }

  optionChanged = (event) => {
    let travelFormGroup = this.formArray.get('2');

    if (travelFormGroup) {
      // Clear validators
      this.clearValidations(travelFormGroup);

      // Set new validation
      switch (event.value) {
        case Constants.travelMode.bus:
          travelFormGroup.get('bustype').setValidators(Validators.required);
          break;
        case Constants.travelMode.train:
          travelFormGroup.get('trainclass').setValidators(Validators.required);
          break;
        case Constants.travelMode.fourwheeler:
          travelFormGroup.get('cartype').setValidators(Validators.required);
          travelFormGroup.get('enginetype').setValidators(Validators.required);
          break;
        default:
          this.clearValidations(travelFormGroup);
          break;
      }
    }
  };

  clearValidations = (travelFormGroup) => {
    travelFormGroup.get('bustype').clearValidators();
    travelFormGroup.get('trainclass').clearValidators();
    travelFormGroup.get('cartype').clearValidators();
    travelFormGroup.get('enginetype').clearValidators();
  }
}
