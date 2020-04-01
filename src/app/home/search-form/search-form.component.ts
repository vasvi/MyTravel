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

   /** Returns a FormArray with the name 'formArray'. */
   get formArray(): AbstractControl | null { return this.searchForm.get('formArray'); };

   hotelRatingOptions = [
      {value: '2 star'},
      {value: '3 star'},
      {value: '4 star'},
      {value: '5 star'},
    ];

    travelTypeOptions = [
      {value: '2-wheeler'},
      {value: '4-wheeler'},
      {value: 'bus'},
      {value: 'train'},
      {value: 'flight'}      
    ]

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = this.createFormGroup();
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
          travel: ['', [Validators.required]]
        })
      ])
    });
  }

  onSubmit = () => {
    const formData: UserParameters = Object.assign({}, this.searchForm.value);
    // TODO: Validate data if required
    this.formData.emit(formData);
  }
}
