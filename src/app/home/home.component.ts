import {Component, OnInit, OnDestroy} from '@angular/core';
import { SearchDataService } from '../services/search-data.serivce';
import * as Constant from '../searchConstants';
import { ApplicableLocationObject } from '../model/search-criteria';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  popularLocations: ApplicableLocationObject;
  popularLocationSubs: Subscription;

  constructor(
    private searchDataService: SearchDataService
  ) { }

  ngOnInit() {
    this.initSearchForPopularLocations();
    this.popularLocationSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => this.getPopularLocations(data));
  }

  initSearchForPopularLocations(): void {
    const defaultPosition = {
      coords: {
        latitude: Constant.searchConstants.defaultLocation.latitude,
        longitude: Constant.searchConstants.defaultLocation.longitude
      }
    };

    navigator.geolocation.getCurrentPosition((position) => {
      this.searchDataService.getApplicableLocations(2500, position);
    }, (error) => {
      this.searchDataService.getApplicableLocations(2500, defaultPosition);
    });
  }

  getPopularLocations = (data) => {
    if (data && data.location && data.location.length) {
      this.popularLocations = data;
    }
  }

  ngOnDestroy() {
    if (this.popularLocationSubs) {
      this.popularLocationSubs.unsubscribe();
    }
  }
}
