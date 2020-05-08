import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateNewEventComponent } from './create-new-event.component';
import { EventsService } from '../services/events/events.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { EventObject } from '../model/event.model';
import { newEventMock, CreateEventMockObj } from '../mockData/events-mock-data';

describe('CreateNewEventComponent', () => {
  let component: CreateNewEventComponent;
  let fixture: ComponentFixture<CreateNewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewEventComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: EventsService, useClass: EventsService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it(`should test ngOnChanges`, () => {
    // setup
    setFormValue();

    // act
    component.ngOnChanges();

    // assert
    expect(component.title.value).toEqual('Trip to Jaipur');
    expect(component.start.value).toEqual('');
    expect(component.end.value).toEqual('');
  });

  it(`should submit form`, () => {
    // setup
    spyOn(component, 'onEventCreation');
    component.location = 'Jaipur, Rajasthan';
    component.setDefaultValues();
    setFormValue();
    const newEvent: EventObject = newEventMock;

    // act
    component.onSubmit();

    // assert
    expect(component.eventData).toEqual(newEvent);
    expect(component.onEventCreation).toHaveBeenCalledTimes(1);
  });

  it(`should test onEventCreation with success response`, () => {
    // setup
    let snackbar = TestBed.get(MatSnackBar);
    spyOn(snackbar, 'open');
    spyOn(component.closeModal, 'emit');

    // act
    component.onEventCreation(CreateEventMockObj);

    // assert
    expect(component.closeModal.emit).toHaveBeenCalledTimes(1);
    expect(snackbar.open).toHaveBeenCalledTimes(1);
    expect(snackbar.open).toHaveBeenCalledWith('Event created successfully!', '', {duration: 5000});
  });

  it(`should test onEventCreation with failure response`, () => {
    // setup
    let snackbar = TestBed.get(MatSnackBar);
    spyOn(snackbar, 'open');
    spyOn(component.closeModal, 'emit');

    // act
    component.onEventCreation(new Error('User is not signed in or Auth token is expired'));

    // assert
    expect(component.closeModal.emit).toHaveBeenCalledTimes(1);
    expect(snackbar.open).toHaveBeenCalledTimes(1);
    expect(snackbar.open).toHaveBeenCalledWith('User is not signed in or Auth token is expired', '', {duration: 10000})
  });

  it(`should test ngOnDestroy`, () => {
    // setup
    component.location = 'Jaipur, Rajasthan';
    component.setDefaultValues();
    setFormValue();
    const newEvent: EventObject = newEventMock;

    // act
    component.onSubmit();
    spyOn(component.createEventSubs, 'unsubscribe');
    component.ngOnDestroy();

    // assert
    expect(component.createEventSubs.unsubscribe).toHaveBeenCalledTimes(1);
  })

  function setFormValue() {
    component.location = 'Jaipur, Rajasthan';
    component.end.setValue('05/23/2020');
    component.start.setValue('05/25/2020');
  }
});
