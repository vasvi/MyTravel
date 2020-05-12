import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {EventObject} from 'src/app/model/event.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CreateEventMockObj} from '../../mockData/events-mock-data'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  useMock: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.useMock = environment.useMock;
  }

  create = (newEvent: EventObject): Observable<any> => {
    if (this.useMock) {
      return of(this.createEventMock());
    } else {
      return this.createEvent(newEvent);
    }
  }

  createEvent = (newEvent: EventObject): Observable<any> => {
    if (sessionStorage.getItem('user_authToken')) {
      let authToken = `Bearer ${sessionStorage.getItem('user_authToken')}`

      let headers = new HttpHeaders({'Authorization': authToken});
      let url = `${environment.EVENT.api_endpoint}?alt=json&key=${environment.GCP.TRAVEL.apiKey}`;

      return this.http.post(url, newEvent, {headers});
    } else {
      return of(new Error('User is not signed in or Auth token is expired'));
    }
  }

  createEventMock = () => {
    return CreateEventMockObj;
  }

  getSheetData = () : Observable <any> => {
    const data ={
      "range": "Sheet1!A1:D5",
      "majorDimension": "ROWS",
      "values": [
        ["Item", "Cost", "Stocked", "Ship Date"],
        ["Wheel", "$20.50", "4", "3/1/2016"],
        ["Door", "$15", "2", "3/15/2016"],
        ["Engine", "$100", "1", "3/20/2016"],
        ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
      ],
    }
    let authToken = `Bearer ${sessionStorage.getItem('user_authToken')}`
      let headers = new HttpHeaders({'Authorization': authToken});
      const url1 ='https://sheets.googleapis.com/v4/spreadsheets?alt=json&key=AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE';
      return this.http.post(url1,{},{headers});
  }

  exportDataToSheet(sheetDetails): Observable<any> {
    let authToken = `Bearer ${sessionStorage.getItem('user_authToken')}`
    let headers = new HttpHeaders({'Authorization': authToken});
    const url1 ='https://sheets.googleapis.com/v4/spreadsheets?alt=json&key=AIzaSyC5-HvS8pMo3xEKtt6SlrC0J7-vfjLP9nE';
    return this.http.post(url1,{},{headers});
  }
}
