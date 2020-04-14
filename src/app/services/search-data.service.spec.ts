import { TestBed } from '@angular/core/testing';

import { SearchDataService } from './search-data.serivce';
import * as constant from '../searchConstants';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('SearchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      
}));
var distanceMatrix;

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
       hotel: {starrating: '2 star'},
       travel: {travelmode: 'train'}
    }
    service.setUserSearchData(userData);
    expect(service).toBeTruthy();
  });

  describe('should test initSearch', ()=>{
    it('should test calculated expenditure ', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'train'}
        }
        // spyOn(service, 'getHotelExpenses').and.returnValue(2000);
        // spyOn(service, 'getFoodExpenses').and.returnValue(2000);
        spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
            var position = { coords: { latitude: 32, longitude: -96 } };
            arguments[0](position);
        });
        service.initSearch(userData)
        expect(service.calculatedExpenditure.hotelExpenditure).toEqual(1000);
        expect(service.calculatedExpenditure.foodExpenditure).toEqual(2000);
    })
    it('should test calculated expenditure if byRoad is true', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'bus'}
        }
        spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
            arguments[1](Error);
        });
        service.initSearch(userData)
        expect(service.calculatedExpenditure.hotelExpenditure).toEqual(1000);
        expect(service.calculatedExpenditure.foodExpenditure).toEqual(2000);
    })
})

describe('should test budgetValidations', ()=>{
    it('should throw error if budget is negative', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        expect(function(){ service.budgetValidations(-4000);}).toThrow(new Error('Your budget is too low. Please modify your search'));
    })
})
describe('should test getHotelExpenses', ()=>{
    it('should return false if budget is negative', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 5000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'Four Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
        }
        // const hotelBudget=service.getHotelExpenses(userData, 50);
        expect(function(){ service.getHotelExpenses(userData, 50);}).toThrow(new Error('Your budget is too low. Please modify your search'));
    })
})  
describe('should test calculateRadius', ()=>{
    it('should test radius if travelmode is Four Wheeler', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'Four Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
        }
        const radius = service.calculateRadius(userData, 10000  );
        expect(radius).toEqual(1667);
    })
    it('should test radius if travelmode is Two Wheeler', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'Two Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
        }
        const radius = service.calculateRadius(userData, 10000);
        expect(radius).toEqual(2500);
    })
    it('should test radius if travelmode is bus', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'bus', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)', bustype: 'AC'}
        }
        const radius = service.calculateRadius(userData, 10000);
        expect(radius).toEqual(1667);
    })
    it('should test radius if travelmode is default', ()=>{
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
            budget: 50000,
            person: 2,
            duration: 2,
            hotel: {starrating: '2 star'},
            travel: {travelmode: 'flight', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)', bustype: 'AC'}
        }
        const radius = service.calculateRadius(userData, 10000);
        expect(radius).toEqual(2500);
    })
})

// describe('Should test getApplicableLocationsSubs', ()=>{
//     it('the function to return applicable locations', ()=>{
//         const service: SearchDataService = TestBed.get(SearchDataService);
//         window.google = {
//             maps: {
//                 DistanceMatrixService: function() {}
//             }
//           };
//         const googleService = new google.maps.DistanceMatrixService();
//         service.globalDestinationsObject = [];
//         spyOn(googleService,"getDistanceMatrix").and.callFake(function() {
//             var data = { rows: [Element, []] };
//             arguments[0](data);
//         });
//         const applicableLocation = service.getApplicableLocationsSubs();
//         expect(service.globalDestinationsObject).toEqual([]);
//     })
// })

describe('Should test getUserSearchData', ()=>{
    it('should test getUserSearchData to return data', () => {
        const service: SearchDataService = TestBed.get(SearchDataService);
        const userData ={
           budget: 5000,
           person: 2,
           duration: 2,
           hotel: {starrating: '2 star'},
           travel: {travelmode: 'train'}
        }
        service.setUserSearchData(userData);
        const userSearchData =service.getUserSearchData().subscribe(data =>{
            expect(data).toEqual(userData);
        });
      });
    });
});