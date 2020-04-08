import { TestBed } from '@angular/core/testing';

import { SearchDataService } from './search-data.serivce';
import * as constant from '../searchConstants';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      
}));
beforeEach(() => {
    
  })


  it('should be created', () => {
    const service: SearchDataService = TestBed.get(SearchDataService);
    expect(service).toBeTruthy();
  });

  it('should test setUserSearchData', () => {
    const service: SearchDataService = TestBed.get(SearchDataService);
    const userData ={
       budget: 5000,
       person: 2,
       duration: 2,
       hotel: {starrating: 2},
       travel: {travelmode: 'train'}
    }
    service.setUserSearchData(userData);
    expect(service).toBeTruthy();
  });

  it('should test getUserSearchData ', ()=>{
    const service: SearchDataService = TestBed.get(SearchDataService);
    const userData ={
        budget: 5000,
        person: 2,
        duration: 2,
        hotel: {starrating: 2},
        travel: {travelmode: 'train'}
     }
    service.initSearch(userData)
    expect(service.calculatedExpenditure.hotelExpenditure).toEqual(0);
  })
});