import {TestBed} from '@angular/core/testing';
import {MapService} from './map.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject} from '@angular/core/testing';
import {environment} from '../../../environments/environment';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));

  it('should be created', () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });

  it('should get addresses', inject([HttpTestingController, MapService],
    (httpMock: HttpTestingController, dataService: MapService) => {
      const latLong = {
        lat: 32.2432,
        long: 77.1892
      };
      dataService.reverseGeoCode(latLong.lat, latLong.long).subscribe((response) => {
        expect(response.toString).toBe(
          {
            plus_code: {
              compound_code: '65VQ+7M Manali, Himachal Pradesh, India',
              global_code: '8J4V65VQ+7M'
            },
            results: [
              {
                address_components: [
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['locality', 'political']
                  },
                  {
                    long_name: 'Siyal',
                    short_name: 'Siyal',
                    types: ['political', 'sublocality', 'sublocality_level_1']
                  },
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  },
                  {
                    long_name: '175131',
                    short_name: '175131',
                    types: ['postal_code']
                  }
                ],
                formatted_address: 'Sylvan Woods Cottage & Home Stay, Bahang, Rohtang Road, Siyal, Manali, Himachal Pradesh 175131, India',
                geometry: {
                  location: {
                    lat: 32.2431872,
                    lng: 77.1891761
                  },
                  location_type: 'GEOMETRIC_CENTER',
                  viewport: {
                    northeast: {
                      lat: 32.2445361802915,
                      lng: 77.19052508029151
                    },
                    southwest: {
                      lat: 32.2418382197085,
                      lng: 77.1878271197085
                    }
                  }
                },
                place_id: 'ChIJGX3kKe2HBDkRSdej1HJpmUo',
                plus_code: {
                  compound_code: '65VQ+7M Manali, Himachal Pradesh, India',
                  global_code: '8J4V65VQ+7M'
                },
                types: ['establishment', 'lodging', 'point_of_interest']
              },
              {
                address_components: [
                  {
                    long_name: '1',
                    short_name: '1',
                    types: ['street_number']
                  },
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['route']
                  },
                  {
                    long_name: 'Model Town',
                    short_name: 'Model Town',
                    types: ['neighborhood', 'political']
                  },
                  {
                    long_name: 'Siyal',
                    short_name: 'Siyal',
                    types: ['political', 'sublocality', 'sublocality_level_1']
                  },
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['locality', 'political']
                  },
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  },
                  {
                    long_name: '175131',
                    short_name: '175131',
                    types: ['postal_code']
                  }
                ],
                formatted_address: '1, Manali, Model Town, Siyal, Manali, Himachal Pradesh 175131, India',
                geometry: {
                  location: {
                    lat: 32.2433882,
                    lng: 77.18912859999999
                  },
                  location_type: 'ROOFTOP',
                  viewport: {
                    northeast: {
                      lat: 32.2447371802915,
                      lng: 77.1904775802915
                    },
                    southwest: {
                      lat: 32.2420392197085,
                      lng: 77.18777961970849
                    }
                  }
                },
                place_id: 'ChIJKRMeqgCIBDkROGT-cSxteQY',
                plus_code: {
                  compound_code: '65VQ+9M Manali, Himachal Pradesh, India',
                  global_code: '8J4V65VQ+9M'
                },
                types: ['street_address']
              },
              {
                address_components: [
                  {
                    long_name: 'Model Town Road',
                    short_name: 'Model Town Rd',
                    types: ['route']
                  },
                  {
                    long_name: 'Model Town',
                    short_name: 'Model Town',
                    types: ['neighborhood', 'political']
                  },
                  {
                    long_name: 'Siyal',
                    short_name: 'Siyal',
                    types: ['political', 'sublocality', 'sublocality_level_1']
                  },
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['locality', 'political']
                  },
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  },
                  {
                    long_name: '175131',
                    short_name: '175131',
                    types: ['postal_code']
                  }
                ],
                formatted_address: 'Model Town Rd, Model Town, Siyal, Manali, Himachal Pradesh 175131, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 32.2432618,
                      lng: 77.18927269999999
                    },
                    southwest: {
                      lat: 32.2431439,
                      lng: 77.1885576
                    }
                  },
                  location: {
                    lat: 32.243218,
                    lng: 77.1889197
                  },
                  location_type: 'GEOMETRIC_CENTER',
                  viewport: {
                    northeast: {
                      lat: 32.2445518302915,
                      lng: 77.1902641302915
                    },
                    southwest: {
                      lat: 32.2418538697085,
                      lng: 77.18756616970849
                    }
                  }
                },
                place_id: 'ChIJe0cOqwCIBDkRev95Sgu0X1k',
                types: ['route']
              },
              {
                address_components: [
                  {
                    long_name: 'Siyal',
                    short_name: 'Siyal',
                    types: ['political', 'sublocality', 'sublocality_level_1']
                  },
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['locality', 'political']
                  },
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  },
                  {
                    long_name: '175131',
                    short_name: '175131',
                    types: ['postal_code']
                  }
                ],
                formatted_address: 'Siyal, Manali, Himachal Pradesh 175131, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 32.2517509,
                      lng: 77.1918288
                    },
                    southwest: {
                      lat: 32.2361895,
                      lng: 77.1754091
                    }
                  },
                  location: {
                    lat: 32.2459144,
                    lng: 77.18589949999999
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 32.2517509,
                      lng: 77.1918288
                    },
                    southwest: {
                      lat: 32.2361895,
                      lng: 77.1754091
                    }
                  }
                },
                place_id: 'ChIJl4y21fyHBDkRVW8eqiKDs3k',
                types: ['political', 'sublocality', 'sublocality_level_1']
              },
              {
                address_components: [
                  {
                    long_name: 'Manali',
                    short_name: 'Manali',
                    types: ['locality', 'political']
                  },
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  }
                ],
                formatted_address: 'Manali, Himachal Pradesh, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 32.2596075,
                      lng: 77.20745099999999
                    },
                    southwest: {
                      lat: 32.2193366,
                      lng: 77.16678859999999
                    }
                  },
                  location: {
                    lat: 32.2431872,
                    lng: 77.1891761
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 32.2596075,
                      lng: 77.20745099999999
                    },
                    southwest: {
                      lat: 32.2193366,
                      lng: 77.16678859999999
                    }
                  }
                },
                place_id: 'ChIJP9A_FgiHBDkRzXZQvg6oKYE',
                types: ['locality', 'political']
              },
              {
                address_components: [
                  {
                    long_name: '175131',
                    short_name: '175131',
                    types: ['postal_code']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  }
                ],
                formatted_address: 'Himachal Pradesh 175131, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 32.4016047,
                      lng: 77.19355729999999
                    },
                    southwest: {
                      lat: 32.2178102,
                      lng: 77.02689939999999
                    }
                  },
                  location: {
                    lat: 32.3038146,
                    lng: 77.1255055
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 32.4016047,
                      lng: 77.19355729999999
                    },
                    southwest: {
                      lat: 32.2178102,
                      lng: 77.02689939999999
                    }
                  }
                },
                place_id: 'ChIJdcf4RKSGBDkRbRWEcxK8V_M',
                types: ['postal_code']
              },
              {
                address_components: [
                  {
                    long_name: 'Kullu',
                    short_name: 'Kullu',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  }
                ],
                formatted_address: 'Kullu, Himachal Pradesh, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 32.4162101,
                      lng: 77.86250009999999
                    },
                    southwest: {
                      lat: 31.34025,
                      lng: 76.93616
                    }
                  },
                  location: {
                    lat: 31.8246483,
                    lng: 77.4701972
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 32.4162101,
                      lng: 77.86250009999999
                    },
                    southwest: {
                      lat: 31.34025,
                      lng: 76.93616
                    }
                  }
                },
                place_id: 'ChIJ2z5nXKn2BDkRvx4G2hViwJs',
                types: ['administrative_area_level_2', 'political']
              },
              {
                address_components: [
                  {
                    long_name: 'Himachal Pradesh',
                    short_name: 'HP',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  }
                ],
                formatted_address: 'Himachal Pradesh, India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 33.257958,
                      lng: 79.003309
                    },
                    southwest: {
                      lat: 30.382469,
                      lng: 75.5874709
                    }
                  },
                  location: {
                    lat: 31.1048294,
                    lng: 77.17339009999999
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 33.257958,
                      lng: 79.003309
                    },
                    southwest: {
                      lat: 30.382469,
                      lng: 75.5874709
                    }
                  }
                },
                place_id: 'ChIJ9wH5Z8NTBDkRJXdLVsUE_nw',
                types: ['administrative_area_level_1', 'political']
              },
              {
                address_components: [
                  {
                    long_name: 'India',
                    short_name: 'IN',
                    types: ['country', 'political']
                  }
                ],
                formatted_address: 'India',
                geometry: {
                  bounds: {
                    northeast: {
                      lat: 35.513327,
                      lng: 97.39535869999999
                    },
                    southwest: {
                      lat: 6.4626999,
                      lng: 68.1097
                    }
                  },
                  location: {
                    lat: 20.593684,
                    lng: 78.96288
                  },
                  location_type: 'APPROXIMATE',
                  viewport: {
                    northeast: {
                      lat: 35.513327,
                      lng: 97.39535869999999
                    },
                    southwest: {
                      lat: 6.4626999,
                      lng: 68.1097
                    }
                  }
                },
                place_id: 'ChIJkbeSa_BfYzARphNChaFPjNc',
                types: ['country', 'political']
              }
            ],
            status: 'OK'
          }.toString);
      });

      const mockReq = httpMock.expectOne('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + (latLong.lat) + ',' + (latLong.long) + '&types=(cities)&key=' + environment.GCP.apiKey);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(latLong);

      httpMock.verify();
    }
    )
  );

});
