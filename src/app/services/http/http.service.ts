import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  makeGetRequest(url, headers = null): Observable<any> {
    headers = headers ? new HttpHeaders(headers) : null;
    return this._http.get(url, { headers });
  }


  createEvent = (): Observable<any> => {
    if (sessionStorage.getItem('user_authToken')) {
      let authToken = `Bearer ${sessionStorage.getItem('user_authToken')}`

      let headers = new HttpHeaders({'Authorization': authToken});
      let url = `${environment.EVENT.api_endpoint}?alt=json&key=${environment.GCP.TRAVEL.apiKey}`;
      let newEvent = {
        end: {date: "2020-05-06"},
        location: "test",
        start: {date: "2020-05-06"},
        summary: "Test event from code"
      }
      console.log(url);
  
      return this._http.post(url, newEvent, { headers });
    }
  }
}
