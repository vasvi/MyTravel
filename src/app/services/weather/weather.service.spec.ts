import { TestBed, async, inject } from '@angular/core/testing';
import { HttpService } from '../http/http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherDataMock, GetWeatherDetailsOptions } from '../../mockData/weather-mock-data';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let httpService: HttpService;

//   beforeEach(async(() => {
//     weatherService = new WeatherService(httpService);
// }));

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [WeatherService, HttpService]
  });

  weatherService = TestBed.get(WeatherService);
})


  it('should be created', () => {
    expect(weatherService).toBeTruthy();
  });

  // xit('should test getWeatherDetails', () => {
  //   httpService = TestBed.get(httpService);

  //   let response = {
  //     daily: WeatherDataMock.daily,
  //     current: WeatherDataMock.current
  //   };

  //   spyOn(httpService, 'makeGetRequest').and.callFake(() => {
  //     return of(WeatherDataMock)
  //   });

  //   let output = weatherService.getWeatherDetails(GetWeatherDetailsOptions);
  //   expect(output).toEqual(of(response));
  // });

  it('should test getWeatherDetails with cached data', inject([HttpTestingController, WeatherService, HttpService],
    (httpMock: HttpTestingController, weatherService: WeatherService, httpService) => {

      let url = `${environment.OPENWEATHER.api_endpoint}/onecall?lat=${GetWeatherDetailsOptions.geometry[0]}&lon=${GetWeatherDetailsOptions.geometry[1]}&appid=${environment.OPENWEATHER.appid}&units=metric`
      spyOn(httpService, 'makeGetRequest').and.callFake(() => {
          return httpMock.expectOne(url);
      });
      weatherService.cacheWeatherDetails = {
        'ChIJP9A_FgiHBDkRzXZQvg6oKYE': {
          daily: WeatherDataMock.daily,
          current: WeatherDataMock.current
        }
      }

      weatherService.getWeatherDetails(GetWeatherDetailsOptions).subscribe((data) => {
        console.log(data);
        expect(data).toEqual({
          daily: WeatherDataMock.daily,
          current: WeatherDataMock.current
        })
      });
    }));
});
