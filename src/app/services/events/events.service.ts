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
      return of(new Error('User is not signed in'))
    }
  }

  createEventMock = () => {
    return CreateEventMockObj;
  }
}
