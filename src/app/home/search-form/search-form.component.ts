import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SearchCriteria} from '../../model/search-criteria';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() formData: EventEmitter<SearchCriteria> = new EventEmitter();
  searchForm: FormGroup;

  // Form properties
  person = new FormControl('', Validators.required);
  budget = new FormControl('', Validators.required);
  duration = new FormControl('', Validators.required);
  travelmode = new FormControl('', Validators.required);
  hoteltype = new FormControl('', Validators.required);

  constructor() {
    this.searchForm = this.createFormGroup();
   }

  ngOnInit() {
  }

  createFormGroup = () => {
    return new FormGroup({
      person: this.person,
      budget: this.budget,
      duration: this.duration,
      travelmode: this.travelmode,
      hoteltype: this.hoteltype
    });
  }

  onSubmit = () => {
    const formData: SearchCriteria = Object.assign({}, this.searchForm.value);
    // TODO: Validate data if required
    this.formData.emit(formData);
  }

}
