import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from './http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports : [HttpClientTestingModule]}));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it(`should test makeGetRequest`, inject([HttpTestingController], (httpMock: HttpTestingController)=> {
    // setup
    const service: HttpService = TestBed.get(HttpService);
    let url = `${environment.OPENWEATHER.api_endpoint}/onecall?lat=32.2431872&lon=77.1891761&appid=${environment.OPENWEATHER.appid}&units=metric`
    
    // action
    service.makeGetRequest(url).subscribe(() => {});

    // assertions
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
  }));
});
