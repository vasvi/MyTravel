import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {
  }

  reverseGeoCode(latitude, longitude) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + (latitude) + ',' + (longitude) + '&types=(cities)&key=' + environment.GCP.apiKey);
  }

}
