import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventObject } from '../model/event.model';
import { MatSnackBar } from '@angular/material';
import { EventsService } from '../services/events/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss']
})
export class CreateNewEventComponent implements OnInit, OnChanges, OnDestroy {
  @Input() location: string;
  @Output() closeModal = new EventEmitter();
  createEventSubs: Subscription;
  createEventForm: FormGroup;
  title = new FormControl('', Validators.required);
  start = new FormControl('', Validators.required);
  end = new FormControl('', Validators.required)

  constructor(
    private eventsService: EventsService,
    private snackbar: MatSnackBar) { 
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

    this.createEventSubs = this.eventsService.create(eventData).subscribe((data) => {
      console.log(data);
        if (data.status === 'confirmed') {
          this.snackbar.open('Event created successfully!', '', {duration: 5000})
        } else if (data.message) {
          this.snackbar.open('User is not signed in or Auth token is expired', '', {duration: 10000})
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

  ngOnDestroy = () => {
    if (this.createEventSubs) {
      this.createEventSubs.unsubscribe();
    }
  }

}
