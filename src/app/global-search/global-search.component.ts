import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapService } from '../services/map/map.service';
import { SearchDataService } from '../services/search-data.serivce';
import { Router } from '@angular/router';
import { LocationService } from '../services/location/location.service';

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
    private ngZone: NgZone
  ) { }

  @ViewChild('locationInput', { static: false }) locationInputViewChild: ElementRef;

  ngAfterViewInit() {
    this.initAutoComplete();
  }

  initAutoComplete() {
    const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement);
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      //  this.onLocationChange.emit(place);
      const queryParamsObj = this.searchService.createLocationObject(autoComplete.getPlace());
      this.locationService.setLocationsDetails(queryParamsObj);
      this.ngZone.run(() => {
        this.router.navigate(['location'], { queryParams: Object.assign({}, { name: queryParamsObj.name }), skipLocationChange: false });
      })
    });
  }

}
