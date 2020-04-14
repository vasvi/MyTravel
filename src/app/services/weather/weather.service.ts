import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { WeatherOptions, WeatherDetails } from '../../model/weather.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  openWeatherApiEndpoint: string = environment.OPENWEATHER.api_endpoint;
  constructor(
    private _http: HttpService
  ) { }

  cacheWeatherDetails: Object = {};

  getWeatherDetails(options: WeatherOptions): Observable<any> {
    let url = `${this.openWeatherApiEndpoint}/onecall?lat=${options.geometry[0]}&lon=${options.geometry[1]}&appid=${environment.OPENWEATHER.appid}`

    return new Observable((observer: Observer<WeatherDetails>) => {
      let cachedData = this.cacheWeatherDetails[options.place_id]
      if (!cachedData) {
        this._http.makeGetRequest(url)
          .subscribe((data) => {
            let obj = {
              daily: data.daily,
              current: data.current
            }
            this.cacheWeatherDetails[options.place_id] = obj;
            observer.next(obj);
            observer.complete();
          }, err => {
            observer.error(err);
          })
      } else {
        observer.next(cachedData);
        observer.complete();
      }


    })

  }


}
