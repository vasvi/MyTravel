import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { newEventMock, CreateEventMockObj } from '../../mockData/events-mock-data';
import { of } from 'rxjs';

fdescribe('EventsService', () => {
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

    spyOn(service, 'createEvent').and.callFake(() => {
      const authToken = sessionStorage.getItem('user_authToken');

      if (authToken)
        return of(CreateEventMockObj);
      else 
        return of(new Error('User is not signed in'));
    });
    
    // act & assert
    service.create(newEventMock).subscribe((data) => {
      expect(data).toEqual(new Error('User is not signed in'));
    })
  });

});
