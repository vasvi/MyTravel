import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) {
  }

  makeGetRequest(url, headers = null): Observable<any> {
    headers = headers ? new HttpHeaders(headers) : null;
    return this._http.get(url, {headers});
  }

  makePostRequest(url, headers = null, data) {
    return this._http.post(url, data, {headers, responseType: 'text'});
  }
}
