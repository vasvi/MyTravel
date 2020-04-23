import {TestBed} from '@angular/core/testing';

import {SearchDataService} from './search-data.serivce';
import * as constant from '../searchConstants';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

describe('SearchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  let distanceMatrix;
  var init = {
    callback: function() {
      console.log("Callback Called")
    }
  };

  beforeEach(() => {

  })


  it('should be created', () => {
    const service: SearchDataService = TestBed.get(SearchDataService);
    expect(service).toBeTruthy();
  });

  it('should test setUserSearchData', () => {
    const service: SearchDataService = TestBed.get(SearchDataService);
    const userData = {
      budget: 5000,
      person: 2,
      duration: 2,
      hotel: {starrating: '2 star'},
      travel: {travelmode: 'train'}
    }
    service.setUserSearchData(userData);
    expect(service).toBeTruthy();
  });

  describe('should test initSearch', () => {
    it('should test calculated expenditure ', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 50000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'train'}
      }
      // spyOn(service, 'getHotelExpenses').and.returnValue(2000);
      // spyOn(service, 'getFoodExpenses').and.returnValue(2000);
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        var position = {coords: {latitude: 32, longitude: -96}};
        arguments[0](position);
      });
      service.initSearch(userData)
      expect(service.calculatedExpenditure.hotelExpenditure).toEqual(1000);
      expect(service.calculatedExpenditure.foodExpenditure).toEqual(2000);
    })
    it('should test calculated expenditure if byRoad is true', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 50000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'bus'}
      }
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        arguments[1](Error);
      });
      service.initSearch(userData)
      expect(service.calculatedExpenditure.hotelExpenditure).toEqual(1000);
      expect(service.calculatedExpenditure.foodExpenditure).toEqual(2000);
    })
  })

  describe('should test budgetValidations', () => {
    it('should throw error if budget is negative', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      expect(function () {
        service.budgetValidations(-4000);
      }).toThrow(new Error('Your budget is too low. Please modify your search'));
    })
  })
  describe('should test getHotelExpenses', () => {
    it('should return false if budget is negative', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 5000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'Four Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
      }
      // const hotelBudget=service.getHotelExpenses(userData, 50);
      expect(function () {
        service.getHotelExpenses(userData, 50);
      }).toThrow(new Error('Your budget is too low. Please modify your search'));
    })
  })
  describe('should test calculateRadius', () => {
    it('should test radius if travelmode is Four Wheeler', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 50000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'Four Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
      }
      const radius = service.calculateRadius(userData, 10000);
      expect(radius).toEqual(1667);
    })
    it('should test radius if travelmode is Two Wheeler', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 50000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'Two Wheeler', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)'}
      }
      const radius = service.calculateRadius(userData, 10000);
      expect(radius).toEqual(2500);
    })
    it('should test radius if travelmode is bus', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 50000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'bus', enginetype: 'diesel', cartype: 'HatchBack (4 Seats)', bustype: 'AC'}
      }
      const radius = service.calculateRadius(userData, 10000);
      expect(radius).toEqual(1667);
    })
    it('should test radius if travelmode is default', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
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

  describe('Should test getUserSearchData', () => {
    it('should test getUserSearchData to return data', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userData = {
        budget: 5000,
        person: 2,
        duration: 2,
        hotel: {starrating: '2 star'},
        travel: {travelmode: 'train'}
      }
      service.setUserSearchData(userData);
      const userSearchData = service.getUserSearchData();
      expect(userSearchData).toEqual(userData);
    });
  });
  
  describe('Should test createLocationObject', () => {
    it('should test createLocationObject to return data', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const locationObj ={
        name: 'Delhi',
        formatted_address: 'formatted_address',
        photos: {},
        id: '2',
        place_id: '1234',
        reference: 'ref',
        geometry: {location: {lat: ()=>{}, lng: ()=>{}}},
      }
      const locationData = service.createLocationObject(locationObj);
      expect(locationData.id).toEqual('2');
    });
    it('should test createLocationObject to return data when photos array is present', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const locationObj ={
        name: 'Delhi',
        formatted_address: 'formatted_address',
        photos: [{getUrl:()=>{}}],
        id: '2',
        place_id: '1234',
        reference: 'ref',
        geometry: {location: {lat: ()=>{}, lng: ()=>{}}},
      }
      const locationData = service.createLocationObject(locationObj);
      expect(locationData.id).toEqual('2');
    });
  });

  describe('Should test getApplicableLocationData', () => {
    it('should test getApplicableLocationData to return data', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userSearchData = service.getApplicableLocationData();
      expect(userSearchData).toEqual(undefined);
    });
  }); 

  describe('Should test getApplicableLocationsSubs', () => {
    it('should test getApplicableLocationsSubs to return data', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      const userSearchData = service.getApplicableLocationsSubs().subscribe((data)=>{
        expect(data).toEqual(undefined);
      }
      );
    });
  }); 
  describe('Should test getPosition', () => {
    it('should test getPosition to call geolocation when no sessionstorage found', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      sessionStorage.setItem('manualLocationObject', null);
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        var position = {coords: {latitude: 32, longitude: -96}};
        arguments[0](position);
      });
      const userSearchData = service.getPosition(()=>{});
       expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
    it('should test getPosition to return data', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      spyOn(init, 'callback');
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        var position = {coords: {latitude: 32, longitude: -96}};
        arguments[0](position);
      });
      const userSearchData = service.getPosition(init.callback);
       expect(init.callback).toHaveBeenCalled();
    });
    it('should test getPosition to call geolocation error when no sessionstorage found', () => {
      const service: SearchDataService = TestBed.get(SearchDataService);
      sessionStorage.setItem('manualLocationObject', null);
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function () {
        var position = {coords: {latitude: 32, longitude: -96}};
        arguments[1](Error);
      });
      const userSearchData = service.getPosition(()=>{});
       expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
  });
});
