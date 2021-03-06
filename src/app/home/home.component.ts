import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchDataService} from '../services/search-data.serivce';
import * as Constant from '../searchConstants';
import {ApplicableLocationObject} from '../model/search-criteria';
import {Subscription} from 'rxjs';
import {MapService} from '../services/map/map.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  popularLocations: ApplicableLocationObject;
  popularLocationSubs: Subscription;
  loadingPopularLocations = true;

  constructor(
    private searchDataService: SearchDataService,
    private mapService: MapService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.initSearchForPopularLocations();
    this.popularLocationSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => this.getPopularLocations(data));
    this.mapService.userLocationChangeEmitter.asObservable().subscribe(() => {
      this.initSearchForPopularLocations();
      this.loadingPopularLocations = true;
      this.popularLocationSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => this.getPopularLocations(data));
    });
  }

  initSearchForPopularLocations(): void {
    const defaultPosition = {
      coords: {
        latitude: Constant.searchConstants.defaultLocation.latitude,
        longitude: Constant.searchConstants.defaultLocation.longitude
      }
    };

    this.searchDataService.getPosition((position) => {
      if (position) {
        this.searchDataService.getApplicableLocations(2500, position);
      } else {
        this.searchDataService.getApplicableLocations(2500, defaultPosition);
      }
    });
  }

  getPopularLocations = (data) => {
    if (data && data.location && data.location.length) {
      this.popularLocations = data;
      this.loadingPopularLocations = false;
    }
  }

  ngOnDestroy() {
    if (this.popularLocationSubs) {
      this.popularLocationSubs.unsubscribe();
    }
  }
}
