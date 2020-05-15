import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {EventObject} from 'src/app/model/event.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CreateEventMockObj} from '../../mockData/events-mock-data';
import {GetUserInfo} from '../../utilities'; 
import { SearchDataService } from '../search-data.serivce';
import { SheetDetails } from 'src/app/mockData/sheets-mock-data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  useMock: boolean;
  constructor(
    private http: HttpClient,
    private searchDataService: SearchDataService
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
    if (GetUserInfo() && GetUserInfo().authToken) {
      let authToken = `Bearer ${GetUserInfo().authToken}`

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

  createSpreadSheet = () : Observable <any> => {
    let authToken = `Bearer ${GetUserInfo().authToken}`;
      let headers = new HttpHeaders({'Authorization': authToken});
      let url = `${environment.SHEETS.api_endpoint}/?alt=json&key=${environment.GCP.TRAVEL.apiKey}`;
      return this.http.post(url,{},{headers});
  }

  createSheet(spreadsheetId): Observable<any>{
    let authToken = `Bearer ${GetUserInfo().authToken}`;
    let headers = new HttpHeaders({'Authorization': authToken});
    const data ={
      "requests": [{
        "addSheet": {
        }
      }]
    }
    let url = `${environment.SHEETS.api_endpoint}/${spreadsheetId}:batchUpdate?alt=json&key=${environment.GCP.TRAVEL.apiKey}`;
    if (this.useMock){
      return of(SheetDetails);
    }else {
     return this.http.post(url,data,{headers})
    }
  }


  exportDataToSheet(spreadsheetId, sheetName): Observable<any> {
    let authToken = `Bearer ${GetUserInfo().authToken}`;
    let headers = new HttpHeaders({'Authorization': authToken});
    const data = {
      "values" : this.getDataToExport(),
      "range": `${sheetName}!A:B`,
      "majorDimension": "ROWS"
    }
    let url = `${environment.SHEETS.api_endpoint}/${spreadsheetId}/values/${sheetName}!A:B?valueInputOption=USER_ENTERED&alt=json&key=${environment.GCP.TRAVEL.apiKey}`;
    return this.http.put(url,data,{headers});
  }

  getDataToExport(){
    let locationsToExport = []; 
    const locationsData = this.searchDataService.getApplicableLocationData();
    locationsToExport.push(["Destination", "Distance"]);
    locationsData.location.forEach(element => {
      locationsToExport.push([element.location, element.details.distance.text])
    });
    return locationsToExport;
  }
}
