import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import {UserParameters} from '../../model/search-criteria';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<UserParameters> = new EventEmitter();
  searchForm: FormGroup;

  get formArray(): AbstractControl | null {
    return this.searchForm.get('formArray');
  }

  get travelmode(): string {
    return this.formArray.get('2').get('travel') && this.formArray.get('2').get('travel').value;
  }

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
  ];

  constructor(private _formBuilder: FormBuilder) {
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
          hotel: ['', Validators.required],
        }),
        this._formBuilder.group({
          travel: ['', [Validators.required]],
          carType: [''],
          engineType: [''],
          busType: [''],
          trainClass: ['']
        })
      ])
    });
  }

  onSubmit = () => {
    const formData: UserParameters = Object.assign({}, this.searchForm.value);
    // TODO: Validate data if required
    this.formData.emit(formData);
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
