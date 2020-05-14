import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchHistoryService } from './search-history.service';
import { HttpService } from '../http/http.service';
import { searchHistoryData } from 'src/app/mockData/search-history.data';
import { of, Observable } from 'rxjs';
class HttpServiceMock {
  makeGetRequest(url) {
    return of(searchHistoryData);
  }
}

describe('SearchHistoryService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpService, useClass: HttpServiceMock }]
    })
    service = TestBed.get(SearchHistoryService);
  });

  it('should be created', () => {
    const service: SearchHistoryService = TestBed.get(SearchHistoryService);
    expect(service).toBeTruthy();
  });

  it('should test parseSearchHistory', () => {
    let mock = [searchHistoryData[0]];
    expect(typeof mock[0].locationData).toEqual('string');
    let parsed = service.parseSearchHistory(mock);
    expect(typeof parsed[0].locationData).toEqual('object');
  })

  describe('getSearchHistory', () => {

    beforeEach(() => {
      // service.searchHistoryCache = { 'gpantbiz@gmail.com': searchHistoryData };
    })

    it('should return Observable', () => {
      expect(service.getSearchHistory('gpantbiz@gmail.com') instanceof Observable).toEqual(true);
    })

    it('should call parseSearchHistory', fakeAsync(() => {
      spyOn(service, 'parseSearchHistory');
      service.getSearchHistory('gpantbiz@gmail.com').subscribe(data => {
        expect(service.parseSearchHistory).toHaveBeenCalled();
      })
    }))

    it('should not call parseSearchHistory', fakeAsync(() => {
      spyOn(service, 'parseSearchHistory');
      service.searchHistoryCache = { 'gpantbiz@gmail.com': searchHistoryData };
      service.getSearchHistory('gpantbiz@gmail.com').subscribe(data => {
        expect(service.parseSearchHistory).not.toHaveBeenCalled();
      })
    }))

    it('should set searchHistoryCache', fakeAsync(() => {
      service.getSearchHistory('gpantbiz@gmail.com').subscribe(data => {
        expect(service.searchHistoryCache['gpantbiz@gmail.com'].length).toBe(6);
      })
    }))

  })

});
