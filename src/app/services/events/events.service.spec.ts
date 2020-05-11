import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { newEventMock, CreateEventMockObj } from '../../mockData/events-mock-data';
import { of } from 'rxjs';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));

  it(`should be created`, () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });

  it(`should test create with useMock true`, () => {
    // setup
    const service: EventsService = TestBed.get(EventsService);
    service.useMock = true;
    
    // act & assert
    service.create(newEventMock).subscribe((data) => {
      expect(data).toEqual(CreateEventMockObj);
    })
  });

  it(`should test create with useMock false`, () => {
    // setup
    const service: EventsService = TestBed.get(EventsService);
    service.useMock = false;
    spyOn(service, 'createEvent');

    service.create(newEventMock);
    expect(service.createEvent).toHaveBeenCalledTimes(1);
  });

  it(`should test createEvent with Auth token`, inject([HttpTestingController], (httpMock: HttpTestingController)=> {
    // setup
    const service: EventsService = TestBed.get(EventsService);
    sessionStorage.setItem('user_authToken', '1');

    service.createEvent(newEventMock).subscribe((data) => {
      expect(data).toEqual(CreateEventMockObj)
    });

    const req = httpMock.expectOne('https://content.googleapis.com/calendar/v3/calendars/primary/events?alt=json&key=AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE')
    expect(req.request.method).toEqual('POST');
  }) );

  it(`should test createEvent without Auth token`, inject([HttpTestingController],
    (httpMock: HttpTestingController)=> {
    // setup
    const service: EventsService = TestBed.get(EventsService);
    if (sessionStorage.getItem('user_authToken')) {
      sessionStorage.removeItem('user_authToken');
    }

    service.createEvent(newEventMock).subscribe((data) => {
      expect(data).toEqual(new Error('User is not signed in'))
    });

    const req = httpMock.expectNone('https://content.googleapis.com/calendar/v3/calendars/primary/events?alt=json&key=AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE');
  }) );
});
