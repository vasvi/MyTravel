import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from '../http/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherDataMock, GetWeatherDetailsOptions } from '../../mockData/weather-mock-data';
import { of } from 'rxjs';

describe('WeatherService', () => {
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [WeatherService, HttpService]
   });
 })


  it('should be created', () => {
    const weatherService = TestBed.get(WeatherService);
    expect(weatherService).toBeTruthy();
  });

  it('should test getWeatherDetails with cached data', inject([WeatherService],
    (weatherService: WeatherService) => {
      weatherService.cacheWeatherDetails = {
        'ChIJP9A_FgiHBDkRzXZQvg6oKYE': {
          daily: WeatherDataMock.daily,
          current: WeatherDataMock.current
        }
      }

      weatherService.getWeatherDetails(GetWeatherDetailsOptions).subscribe((data) => {
        expect(data).toEqual({
          daily: WeatherDataMock.daily,
          current: WeatherDataMock.current
        })
      });
    }));

    it('should test getWeatherDetails with no cached data', inject([WeatherService, HttpService],
      (weatherService: WeatherService, httpService: HttpService) => {

        weatherService.cacheWeatherDetails = {
          'JP9A_FgiHBDkRzXZQvg6oKYE': {
            daily: WeatherDataMock.daily,
            current: WeatherDataMock.current
          }
        }

        spyOn(httpService, 'makeGetRequest').and.callFake(() => {
            return of(WeatherDataMock);
        });

        weatherService.getWeatherDetails(GetWeatherDetailsOptions).subscribe((data) => {
          console.log(data);
          expect(data).toEqual({
            daily: WeatherDataMock.daily,
            current: WeatherDataMock.current
          })
        });
      }));
});