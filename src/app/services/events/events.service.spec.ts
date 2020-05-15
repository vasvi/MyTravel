import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { newEventMock, CreateEventMockObj } from '../../mockData/events-mock-data';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchDataService } from '../search-data.serivce';
import { ApplicableLocations } from 'src/app/mockData/location-mock-data';


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
    spyOn(service, 'createEvent');

    service.create(newEventMock);
    expect(service.createEvent).toHaveBeenCalledTimes(1);
  });

  it(`should test createEvent with Auth token`, inject([HttpTestingController], (httpMock: HttpTestingController)=> {
    // setup
    const service: EventsService = TestBed.get(EventsService);
    sessionStorage.setItem('userinfo', '{"authToken": "1"}');

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
    if (sessionStorage.getItem('userinfo')) {
      sessionStorage.removeItem('userinfo');
    }

    service.createEvent(newEventMock).subscribe((data) => {
      expect(data).toEqual(new Error('User is not signed in or Auth token is expired'));
    });

    const req = httpMock.expectNone('https://content.googleapis.com/calendar/v3/calendars/primary/events?alt=json&key=AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE');
  }) );

  it('should test createSpreadSheet', inject([HttpTestingController], (httpMock: HttpTestingController)=>{
    const service: EventsService = TestBed.get(EventsService);
    sessionStorage.setItem('userinfo', '{"authToken": "1"}');
    service.createSpreadSheet().subscribe((data)=>{
    });
    const req = httpMock.expectOne(`${environment.SHEETS.api_endpoint}/?alt=json&key=${environment.GCP.TRAVEL.apiKey}`)
    expect(req.request.method).toEqual('POST');
  }))

  it('should test createSheet', inject([HttpTestingController], (httpMock: HttpTestingController)=>{
    const service: EventsService = TestBed.get(EventsService);
    sessionStorage.setItem('userinfo', '{"authToken": "1"}');
    const spreadsheetId = 'abcd1234'
    service.createSheet(spreadsheetId).subscribe((data)=>{
      expect(data.spreadSheetId).toEqual("1in7_BGTW2QS1DqfiR3eDtE_DXm2bFe8F85dWGRPCdhU");
    });
    // const req = httpMock.expectOne(`${environment.SHEETS.api_endpoint}/${spreadsheetId}:batchUpdate?alt=json&key=${environment.GCP.TRAVEL.apiKey}`)
    // expect(req.request.method).toEqual('POST');
  }))

  it('should test createSpreadSheet', inject([HttpTestingController], (httpMock: HttpTestingController)=>{
    const spreadsheetId = 'abcd1234';
    const sheetName = 'Sheet1';
    const service: EventsService = TestBed.get(EventsService);
    const searchDataService:SearchDataService = TestBed.get(SearchDataService) 
    spyOn(searchDataService, 'getApplicableLocationData').and.returnValue(ApplicableLocations);
    sessionStorage.setItem('userinfo', '{"authToken": "1"}');
    service.exportDataToSheet(spreadsheetId,sheetName).subscribe((data)=>{
    });
    const req = httpMock.expectOne(`${environment.SHEETS.api_endpoint}/${spreadsheetId}/values/${sheetName}!A:B?valueInputOption=USER_ENTERED&alt=json&key=${environment.GCP.TRAVEL.apiKey}`)
    expect(req.request.method).toEqual('PUT');
  }))

});
