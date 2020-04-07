import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) {}

  makeGetRequest(url: string, headers: any = null) {
    let httpHeaders = headers ? new HttpHeaders(headers) : null;
    return this._http.get(url, { headers: httpHeaders })
  }
}
