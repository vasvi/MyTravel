import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import { Subject, Observable, of, observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class SearchDataServiceMock {

    private applicableLocationsSubject = new Subject<any>();
    private data = {location:[], position:{
      coords:
        {latitude: 0, longitude: 0}
    }};
    getApplicableLocations(radius, position) {
      this.applicableLocationsSubject.next({location: [{}]});
    }
  
    getApplicableLocationsSubs() {
      return this.applicableLocationsSubject.asObservable();
    }
  
      getApplicableLocationData() {
        return this.data;
      }
  
      getPosition(){
        return {coord: {}}
      }

      initSearch(){}
  
  } 