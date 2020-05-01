import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventObject } from '../model/event.model';
import { HttpService } from '../services/http/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss']
})
export class CreateNewEventComponent implements OnInit, OnChanges {
  @Input() location: string;
  @Output() closeModal = new EventEmitter();
  createEventForm: FormGroup;
  title = new FormControl('', Validators.required);
  start = new FormControl('', Validators.required);
  end = new FormControl('', Validators.required)

  constructor(
    private httpService: HttpService,
    private snackbar: MatSnackBar
  ) { 
  }

  ngOnChanges() {
    this.setDefaultValues();
  }

  ngOnInit() {
    console.log(this.location);
    this.createEventForm = this.createForm();
  }
  
  onSubmit = () => {
    const eventData: EventObject = Object.assign({}, {
      location: this.location,
      end: {
        date: this.end.value
      },
      start: {
        date: this.start.value
      },
      summary: this.title.value
    });

    this.httpService.createEvent(eventData).subscribe((data) => {
        if (data.status === 'confirmed') {
          this.snackbar.open('Event created successfully!', '', {duration: 5000})
        }
        this.closeModal.emit();
    })
  }

  createForm = () => {
    return new FormGroup({
      title: this.title,
      start: this.start,
      end: this.end
    })
  }

  setDefaultValues = () => {
    this.title.setValue(`Trip to ${this.location.split(',')[0]}`);
    this.start.setValue('');
    this.end.setValue('');
  }

}
