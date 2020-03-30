import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  // Form properties
  persons = new FormControl('', Validators.required);
  budget = new FormControl('', Validators.required);
  daysOfStay = new FormControl('', Validators.required);
  travelMode = new FormControl('', Validators.required);
  hotelRating = new FormControl('', Validators.required);

  // Form Group
  searchForm = new FormGroup({
    persons: this.persons,
    budget: this.budget,
    daysOfStay: this.daysOfStay,
    travelMode: this.travelMode,
    hotelRating: this.hotelRating
  });


  ngOnInit() {
  }

}
