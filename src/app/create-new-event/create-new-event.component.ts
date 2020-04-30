import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from '../model/event.model';

@Component({
  selector: 'create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss']
})
export class CreateNewEventComponent implements OnInit {
  @Input() location: string;
  createEventForm: FormGroup;

  constructor() { 
    this.createEventForm = this.createForm();
  }

  ngOnInit() {
    /*let title = `Trip to ${this.location}`;
    console.log(title);

    if (this.createEventForm) {
      console.log(this.createEventForm.get('title'));
      this.createEventForm.get('title').setValue(title);
    }*/
  } 

  createForm = () => {    
    return new FormGroup({
      title: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    })
  }

}
