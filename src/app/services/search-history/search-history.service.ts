import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable, Observer, of } from 'rxjs';
import { searchHistoryData } from '../../mockData/search-history.data';
const cloudFunctionAPi = {
  getUri: environment.GCP.TRAVEL.cloud_function_uri + 'getApi?action=retrievelocationdata&emailId=',
  postUri: environment.GCP.TRAVEL.cloud_function_uri + 'postApi'
}
@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private searchHistoryCache: Object = {};
  useMock: boolean = false;
  mockData: Array<any>;
  constructor(
    private http: HttpService
  ) {
    this.useMock = environment.useMock;
    this.mockData = searchHistoryData;
  }

  private clearSearchHistoryCache(id) {
    delete this.searchHistoryCache[id];
  }

  private createCloudFunctionFetchObservable(id) {
    return new Observable((observer: Observer<any>) => {
      if (this.useMock) {
        let data = this.mockData;
        observer.next(data);
        observer.complete();
      } else {
        this.http.makeGetRequest(cloudFunctionAPi.getUri + id)
          .subscribe(data => {
            observer.next(data);
            observer.complete();
          })
      }
    })
  }

  private parseSearchHistory(data) {
    let result = [];
    data.forEach(item => {
      let obj = {
        timestamp: item.timeStamp,
        locationData: {}
      }
      try{
        obj.locationData = JSON.parse(item.locationData);
        if(obj.locationData.hasOwnProperty('person')) result.push(obj);
      }
      catch(e){

      }
    })
    return result;
  }

  getSearchHistory(id) {
    return new Observable((observer: Observer<any>) => {
      let cachedHistory = this.searchHistoryCache[id];
      if (cachedHistory) {
        observer.next(cachedHistory);
        observer.complete();
      } else {
        this.createCloudFunctionFetchObservable(id).subscribe(data => {
          data = this.parseSearchHistory(data);
          this.searchHistoryCache[id] = data;
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
        })
      }
    })
  }

  saveSearch(payload) {
    if(this.useMock){
      return of('abcmock');
    }else{
      this.clearSearchHistoryCache(payload.emailId);
      payload.action = 'addLocationdata';
      return this.http.makePostRequest(cloudFunctionAPi.postUri, null, payload);
    }
  }

}
