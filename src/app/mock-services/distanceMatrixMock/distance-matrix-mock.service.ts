import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceMatrixMockService {

  private distanceMatrixMockData = {
    rows: [{
      elements: [{
        distance: {text: '536 km', value: 536080},
        duration: {text: '12 hours 29 mins', value: 44931},
        status: 'OK'
      }, {
        distance: {text: '275 km', value: 275230},
        duration: {text: '4 hours 48 mins', value: 17299},
        status: 'OK'
      }, {
        distance: {text: '315 km', value: 315224},
        duration: {text: '7 hours 3 mins', value: 25371},
        status: 'OK'
      }, {
        distance: {text: '294 km', value: 294451},
        duration: {text: '6 hours 33 mins', value: 23577},
        status: 'OK'
      }, {
        distance: {text: '328 km', value: 328444},
        duration: {text: '7 hours 24 mins', value: 26666},
        status: 'OK'
      }, {
        distance: {text: '296 km', value: 295640},
        duration: {text: '6 hours 56 mins', value: 24972},
        status: 'OK'
      }, {
        distance: {text: '1,008 km', value: 1008028},
        duration: {text: '1 day 2 hours', value: 92053},
        status: 'OK'
      }, {distance: {text: '1,902 km', value: 1901819}, duration: {text: '1 day 10 hours', value: 124045}, status: 'OK'}]
    }],
    originAddresses: ['E/A15, Sant Garh, Krishna Nagar, Chaukhandi, Vishnu Garden, Delhi, 110018, India'],
    destinationAddresses: ['Manali, Himachal Pradesh, India', 'Jaipur, Rajasthan, India', 'Nainital, Uttarakhand, India', 'Mussoorie, Uttarakhand, India', 'Chakrata, Uttarakhand 248123, India', 'Dhanaulti, Uttarakhand, India', 'Leh', 'Goa, India']
  };

  getMockData() {
    return this.distanceMatrixMockData;
  }

}
