import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { SearchDataService } from '../services/search-data.serivce';
import { Router } from '@angular/router';
import { LocationService } from '../services/location/location.service';
import { environment } from '../../environments/environment';
import { PlacesMockService } from '../mock-services/places-mock/places-mock-service';

declare const google;

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private searchService: SearchDataService,
    private locationService: LocationService,
    private ngZone: NgZone,
    private placesMock: PlacesMockService
  ) {
    this.demoMode = environment.demoMode;
  }

  @ViewChild('locationInput', { static: false }) locationInputViewChild: ElementRef;

  ngAfterViewInit() {
    if (this.demoMode) {
      this.mockLocations.push(this.placesMock.getMockData().result);
    } else {
      this.initAutoComplete();
    }
  }

  initAutoComplete() {
    const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement);
    autoComplete.setFields(['reference', 'formatted_address', 'geometry.location', 'name','photos','id','place_id']);
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      //  this.onLocationChange.emit(place);
      let queryParamsObj;
      if(environment.useMock){
       queryParamsObj = this.searchService.createLocationObject(this.placesMock.getMockData().result);
      }else{
       queryParamsObj = this.searchService.createLocationObject(autoComplete.getPlace());
      }
      this.locationService.setLocationsDetails(queryParamsObj);
      this.ngZone.run(() => {
        this.router.navigate(['location'], { queryParams: Object.assign({}, { name: queryParamsObj.name }), skipLocationChange: false });
      })
    });
  }

  /**
   * 
   * Demo Mode
   * 
   */

  demoMode: boolean;
  mockLocations: Array<any> = [];
  displayLocations: boolean;
  locationName: string;

  showLocationBox() {
    this.displayLocations = true;
  }

  hideLocationBox() {
    this.displayLocations = false;
  }

  redirect(location) {
    this.locationName = location.name;
    this.displayLocations = false;
    this.locationService.setLocationsDetails(this.searchService.createLocationObject(location));
    this.router.navigate(['location'], { queryParams: Object.assign({}, { name: location.name }), skipLocationChange: false });
  }

}


