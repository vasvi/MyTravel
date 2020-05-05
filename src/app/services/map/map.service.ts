import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Subject} from 'rxjs';
import {GeocoderMockService} from '../../mock-services/geocoderMock/geocoder-mock.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  userLocationChangeEmitter: Subject<any> = new Subject();

  constructor(private http: HttpClient, private geoCodeMock: GeocoderMockService) {
  }

  reverseGeoCode(latitude, longitude) {
    if (environment.useMock) {
      return new BehaviorSubject(this.geoCodeMock.getReverseGeoCodeData(latitude, longitude));
    } else {
      return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + (latitude) + ',' + (longitude) + '&types=(cities)&key=' + environment.GCP.MY_MAPS.apiKey);
    }
  }
}
