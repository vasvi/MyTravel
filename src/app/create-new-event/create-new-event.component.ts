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
  eventData: EventObject;

  constructor(
    private eventsService: EventsService,
    private snackbar: MatSnackBar) { 
  }

  ngOnChanges() {
    this.setDefaultValues();
  }

  ngOnInit() {
    this.createEventForm = this.createForm();
  }
  
  onSubmit = () => {
    this.eventData = Object.assign({}, {
      location: this.location,
      end: {
        date: this.end.value
      },
      start: {
        date: this.start.value
      },
      summary: this.title.value
    });

    this.createEventSubs = this.eventsService.create(this.eventData).subscribe((data) => this.onEventCreation(data))
  }

  onEventCreation = (data) => {
    if (data.status === 'confirmed')
      this.snackbar.open('Event created successfully!', '', {duration: 5000})
    else if (data.status !== 'confirmed' && data.message)
      this.snackbar.open(data.message, '', {duration: 10000})

    this.closeModal.emit();
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
