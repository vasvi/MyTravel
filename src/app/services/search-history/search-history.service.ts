import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { searchHistoryData } from '../../mockData/search-history.data';
const cloudFunctionAPi = {
  getUri: environment.GCP.TRAVEL.cloud_function_fetch_uri + '?action=retrieveLocationData&emailId=',
  postUri: ''
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

  clearSearchHistoryCache(id) {
    delete this.searchHistoryCache[id];
  }

  createCloudFunctionFetchObservable(id) {
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
    data = data.map(o => {
      return {
        timestamp: o.timeStamp,
        locationData: JSON.parse(o.locationData)
      }
    })
    return data;
  }

  getSearchHistory(id) {
    return new Observable((observer: Observer<any>) => {
      let cachedHistory = this.searchHistoryCache[id];
      if (cachedHistory) {
        observer.next(cachedHistory);
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
      observer.complete();
    })
  }

}
