import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocoderMockService {

  private reverseGeoCodeMockData = {
    plus_code: {compound_code: 'J3WQ+8X Delhi, India', global_code: '7JWVJ3WQ+8X'},
    results: [{
      access_points: [],
      address_components: [{long_name: 'E/A15', short_name: 'E/A15', types: ['premise']}, {
        long_name: 'Sant Garh',
        short_name: 'Sant Garh',
        types: ['neighborhood', 'political']
      }, {
        long_name: 'Krishna Nagar',
        short_name: 'Krishna Nagar',
        types: ['political', 'sublocality', 'sublocality_level_3']
      }, {
        long_name: 'Chaukhandi',
        short_name: 'Chaukhandi',
        types: ['political', 'sublocality', 'sublocality_level_2']
      }, {
        long_name: 'Vishnu Garden',
        short_name: 'Vishnu Garden',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }, {long_name: '110018', short_name: '110018', types: ['postal_code']}],
      formatted_address: 'E/A15, Sant Garh, Krishna Nagar, Chaukhandi, Vishnu Garden, Delhi, 110018, India',
      geometry: {
        location: {lat: 28.646103, lng: 77.08998299999999},
        location_type: 'ROOFTOP',
        viewport: {
          northeast: {lat: 28.6474519802915, lng: 77.09133198029149},
          southwest: {lat: 28.6447540197085, lng: 77.08863401970848}
        }
      },
      place_id: 'ChIJSS_K5Y8EDTkRLcFg_jjktwM',
      plus_code: {compound_code: 'J3WQ+CX Vishnu Garden, Delhi, India', global_code: '7JWVJ3WQ+CX'},
      types: ['street_address']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'Gurudwara Road',
        short_name: 'Gurudwara Rd',
        types: ['route']
      }, {
        long_name: 'Krishna Nagar',
        short_name: 'Krishna Nagar',
        types: ['political', 'sublocality', 'sublocality_level_3']
      }, {
        long_name: 'Chaukhandi',
        short_name: 'Chaukhandi',
        types: ['political', 'sublocality', 'sublocality_level_2']
      }, {
        long_name: 'Vishnu Garden',
        short_name: 'Vishnu Garden',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }, {long_name: '110018', short_name: '110018', types: ['postal_code']}],
      formatted_address: 'Gurudwara Rd, Krishna Nagar, Chaukhandi, Vishnu Garden, Delhi, 110018, India',
      geometry: {
        bounds: {
          northeast: {lat: 28.6460363, lng: 77.0894881},
          southwest: {lat: 28.6441417, lng: 77.08830119999999}
        },
        location: {lat: 28.6450474, lng: 77.08904179999999},
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {lat: 28.6464379802915, lng: 77.09024363029151},
          southwest: {lat: 28.6437400197085, lng: 77.0875456697085}
        }
      },
      place_id: 'ChIJl4DXJZAEDTkRWBzsX44auXI',
      types: ['route']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'Block C',
        short_name: 'Block C',
        types: ['political', 'sublocality', 'sublocality_level_3']
      }, {
        long_name: 'Old Sahib Pura',
        short_name: 'Old Sahib Pura',
        types: ['political', 'sublocality', 'sublocality_level_2']
      }, {
        long_name: 'Tilak Nagar',
        short_name: 'Tilak Nagar',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }, {long_name: '110018', short_name: '110018', types: ['postal_code']}],
      formatted_address: 'Block C, Old Sahib Pura, Tilak Nagar, Delhi, 110018, India',
      geometry: {
        bounds: {northeast: {lat: 28.646039, lng: 77.0948219}, southwest: {lat: 28.6411899, lng: 77.0892581}},
        location: {lat: 28.6432374, lng: 77.0920599},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.646039, lng: 77.0948219}, southwest: {lat: 28.6411899, lng: 77.0892581}}
      },
      place_id: 'ChIJE67-kZoEDTkRvA49mjkkkAY',
      types: ['political', 'sublocality', 'sublocality_level_3']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'Old Sahib Pura',
        short_name: 'Old Sahib Pura',
        types: ['political', 'sublocality', 'sublocality_level_2']
      }, {
        long_name: 'Block C',
        short_name: 'Block C',
        types: ['political', 'sublocality', 'sublocality_level_3']
      }, {
        long_name: 'Tilak Nagar',
        short_name: 'Tilak Nagar',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }, {long_name: '110018', short_name: '110018', types: ['postal_code']}],
      formatted_address: 'Block C, Old Sahib Pura, Tilak Nagar, Delhi, 110018, India',
      geometry: {
        bounds: {northeast: {lat: 28.646039, lng: 77.0948219}, southwest: {lat: 28.6411899, lng: 77.0892581}},
        location: {lat: 28.6432374, lng: 77.0920599},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.646039, lng: 77.0948219}, southwest: {lat: 28.6411899, lng: 77.0892581}}
      },
      place_id: 'ChIJDa7-kZoEDTkRzrFIZVIEO5Y',
      types: ['political', 'sublocality', 'sublocality_level_2']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'Tilak Nagar',
        short_name: 'Tilak Nagar',
        types: ['political', 'sublocality', 'sublocality_level_1']
      }, {long_name: 'New Delhi', short_name: 'New Delhi', types: ['locality', 'political']}, {
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }, {long_name: '110018', short_name: '110018', types: ['postal_code']}],
      formatted_address: 'Tilak Nagar, New Delhi, Delhi 110018, India',
      geometry: {
        bounds: {northeast: {lat: 28.646139, lng: 77.1076889}, southwest: {lat: 28.6313201, lng: 77.080561}},
        location: {lat: 28.6389315, lng: 77.08668109999999},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.646139, lng: 77.1076889}, southwest: {lat: 28.6313201, lng: 77.080561}}
      },
      place_id: 'ChIJx4LCUpoEDTkRpDT3uvi1aPo',
      types: ['political', 'sublocality', 'sublocality_level_1']
    }, {
      access_points: [],
      address_components: [{long_name: '110018', short_name: '110018', types: ['postal_code']}, {
        long_name: 'New Delhi',
        short_name: 'New Delhi',
        types: ['locality', 'political']
      }, {long_name: 'Delhi', short_name: 'DL', types: ['administrative_area_level_1', 'political']}, {
        long_name: 'India',
        short_name: 'IN',
        types: ['country', 'political']
      }],
      formatted_address: 'New Delhi, Delhi 110018, India',
      geometry: {
        bounds: {northeast: {lat: 28.6610623, lng: 77.1101034}, southwest: {lat: 28.625111, lng: 77.0602006}},
        location: {lat: 28.6436082, lng: 77.08698369999999},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.6610623, lng: 77.1101034}, southwest: {lat: 28.625111, lng: 77.0602006}}
      },
      place_id: 'ChIJr_ECD5sEDTkRN_4gFZb0VZ4',
      types: ['postal_code']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'West Delhi',
        short_name: 'West Delhi',
        types: ['administrative_area_level_2', 'political']
      }, {long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'Delhi',
        short_name: 'DL',
        types: ['administrative_area_level_1', 'political']
      }, {long_name: 'India', short_name: 'IN', types: ['country', 'political']}],
      formatted_address: 'West Delhi, Delhi, India',
      geometry: {
        bounds: {northeast: {lat: 28.70129, lng: 77.17972999999999}, southwest: {lat: 28.60701, lng: 76.9549899}},
        location: {lat: 28.6663433, lng: 77.067959},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.70129, lng: 77.17972999999999}, southwest: {lat: 28.60701, lng: 76.9549899}}
      },
      place_id: 'ChIJpzxpCVcEDTkRJ6lFFSLbnkM',
      types: ['administrative_area_level_2', 'political']
    }, {
      access_points: [],
      address_components: [{long_name: 'Delhi', short_name: 'Delhi', types: ['locality', 'political']}, {
        long_name: 'Delhi',
        short_name: 'DL',
        types: ['administrative_area_level_1', 'political']
      }, {long_name: 'India', short_name: 'IN', types: ['country', 'political']}],
      formatted_address: 'Delhi, India',
      geometry: {
        bounds: {northeast: {lat: 28.88284, lng: 77.34488}, southwest: {lat: 28.50197, lng: 76.8378199}},
        location: {lat: 28.6862738, lng: 77.2217831},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.88284, lng: 77.34488}, southwest: {lat: 28.50197, lng: 76.8378199}}
      },
      place_id: 'ChIJL_P_CXMEDTkRw0ZdG-0GVvw',
      types: ['locality', 'political']
    }, {
      access_points: [],
      address_components: [{
        long_name: 'Delhi',
        short_name: 'DL',
        types: ['administrative_area_level_1', 'political']
      }, {long_name: 'India', short_name: 'IN', types: ['country', 'political']}],
      formatted_address: 'Delhi, India',
      geometry: {
        bounds: {
          northeast: {lat: 28.881338, lng: 77.3484578},
          southwest: {lat: 28.412593, lng: 76.83806899999999}
        },
        location: {lat: 28.7040592, lng: 77.10249019999999},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 28.881338, lng: 77.3484578}, southwest: {lat: 28.412593, lng: 76.83806899999999}}
      },
      place_id: 'ChIJLbZ-NFv9DDkRQJY4FbcFcgM',
      types: ['administrative_area_level_1', 'political']
    }, {
      access_points: [],
      address_components: [{long_name: 'India', short_name: 'IN', types: ['country', 'political']}],
      formatted_address: 'India',
      geometry: {
        bounds: {northeast: {lat: 35.513327, lng: 97.39535869999999}, southwest: {lat: 6.4626999, lng: 68.1097}},
        location: {lat: 20.593684, lng: 78.96288},
        location_type: 'APPROXIMATE',
        viewport: {northeast: {lat: 35.513327, lng: 97.39535869999999}, southwest: {lat: 6.4626999, lng: 68.1097}}
      },
      place_id: 'ChIJkbeSa_BfYzARphNChaFPjNc',
      types: ['country', 'political']
    }],
    status: 'OK'
  };

  getReverseGeoCodeData(lat, lng) {
    return this.reverseGeoCodeMockData;
  }

}
