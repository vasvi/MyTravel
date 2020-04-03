import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray} from '@angular/forms';
import {UserParameters} from '../../model/search-criteria';
import {SearchDataService} from '../../services/search-data.serivce';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<any> = new EventEmitter();
  searchForm: FormGroup;

  /**Form getters */
   get formArray(): AbstractControl | null { return this.searchForm.get('formArray'); };
   get travelmode(): string { return this.formArray.get('2').get('travelmode') && this.formArray.get('2').get('travelmode').value };
   get hotelData(): Object { return this.formArray.get('1') && this.formArray.get('1').value};
   get generalDetails(): Object { return this.formArray.get('0') && this.formArray.get('0').value};
   get travelDetails(): Object {return this.formArray.get('2') && this.formArray.get('2').value};

   hotelRatingOptions = [
      {value: '2 star'},
      {value: '3 star'},
      {value: '4 star'},
      {value: '5 star'},
    ];

    travelTypeOptions = [
      {value: 'two wheeler'},
      {value: 'four wheeler'},
      {value: 'bus'},
      {value: 'train'},
      {value: 'flight'}      
    ]

  constructor(
    private _formBuilder: FormBuilder,
    private searchDataService: SearchDataService) {
  }

  ngOnInit() {
    this.searchForm = this.createFormGroup();
    console.log(this.searchForm);
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
          vehicletype: [''],
          enginetype: [''],
          bustype: [''],
          trainclass: ['']          
        })
      ])
    });
  }

  onSubmit = () => {
    const formData: FormArray[] = this.searchForm.value;
    console.log(this.hotelData);
    console.log(this.generalDetails);
    console.log(this.travelDetails);

    let obj = {};
    Object.assign(obj, this.generalDetails);

    Object.assign(obj, {
      hotel: Object.assign({}, this.hotelData)
    });

    Object.assign(obj, {
      travel: Object.assign({}, this.travelDetails)
    });
    
    console.log(obj);

    this.searchDataService.setUserSearchData(obj as UserParameters);

    // TODO: Validate data if required
    this.formData.emit();
  }

  optionChanged = (event) => {
    let travelFormGroup = this.formArray.get('2').get('bustype') && this.formArray.get('2');
    console.log(event.value); // bus
    if (travelFormGroup) {
      // Clear validators
      this.clearValidations(travelFormGroup);

      // Set new validation
      switch (event.value) {
        case 'bus':
          travelFormGroup.get('bustype').setValidators(Validators.required);
          break;
        case 'train':
          travelFormGroup.get('trainclass').setValidators(Validators.required);
          break;
        case 'two wheeler':
        case 'four wheeler':
          travelFormGroup.get('vehicletype').setValidators(Validators.required);
          travelFormGroup.get('enginetype').setValidators(Validators.required);
          break;
        default:
          this.clearValidations(travelFormGroup);
          break;
      }
    }
  }

  clearValidations = (travelFormGroup) => {
    travelFormGroup.get('bustype').clearValidators();
    travelFormGroup.get('trainclass').clearValidators();
    travelFormGroup.get('vehicletype').clearValidators();
    travelFormGroup.get('enginetype').clearValidators();
  }
}
