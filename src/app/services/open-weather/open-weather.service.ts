import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private apiEndpoint: string = environment.OPENWEATHER.api_endpoint;
  private appId: string = environment.OPENWEATHER.app_id
  constructor(
    private _httpService: HttpService
  ) { }

  getWeatherData(lat, lng){
    let url = `${this.apiEndpoint}onecall?lat=${lat}&lon=${lng}&appid=${this.appId}`;
    return this._httpService.makeGetRequest(url);
  }

}
