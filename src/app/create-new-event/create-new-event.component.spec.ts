import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateNewEventComponent } from './create-new-event.component';
import { EventsService } from '../services/events/events.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { EventObject} from '../model/event.model';

describe('CreateNewEventComponent', () => {
  let component: CreateNewEventComponent;
  let fixture: ComponentFixture<CreateNewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewEventComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule
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
    const eventObj: EventObject = Object.assign({}, {
      location: 'Jaipur, Rajasthan',
      end: {
        date: '05/23/2020'
      },
      start: {
        date: '05/25/2020'
      },
      summary: 'Trip to Jaipur'
    });

    // act
    component.onSubmit();

    // assert
    expect(component.eventData).toEqual(eventObj);
    expect(component.onEventCreation).toHaveBeenCalledTimes(1);
  });

  function setFormValue() {
    component.location = 'Jaipur, Rajasthan';
    component.end.setValue('05/23/2020');
    component.start.setValue('05/25/2020');
  }
});
