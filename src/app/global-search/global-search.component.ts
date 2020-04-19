import {Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MapService} from '../services/map/map.service';
import {SearchDataService} from '../services/search-data.serivce';
import {Router} from '@angular/router';

declare const google;

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements AfterViewInit {
  constructor(private router: Router,
              private ngZone: NgZone,
              private mapService: MapService,
              private dialog: MatDialog,
              private searchService: SearchDataService) {
  }

  @ViewChild('locationInput', {static: false}) locationInputViewChild: ElementRef;
  @Output() onLocationChange: EventEmitter<any> = new EventEmitter();
  place: any = '';

  ngAfterViewInit() {
    this.initAutoComplete();
  }

  initAutoComplete() {
    setTimeout(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement);
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        this.place = autoComplete.getPlace();
        //  this.onLocationChange.emit(place);
      });
    }, 300);
  }

  routeToLocation() {
    if (this.place) {
      this.ngZone.run(() => {
        const queryParamsObj = this.searchService.createLocationObject(this.place);
        this.router.navigate(['location'], {queryParams: Object.assign({}, queryParamsObj), skipLocationChange: true});
      });
    }
  }
}
