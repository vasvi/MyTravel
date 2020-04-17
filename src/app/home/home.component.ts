import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchDataService} from '../services/search-data.serivce';
import * as Constant from '../searchConstants';
import {ApplicableLocationObject} from '../model/search-criteria';
import {Subscription} from 'rxjs';
import {MapService} from '../services/map/map.service';

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
    private searchDataService: SearchDataService, private mapService: MapService
  ) {
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

    let manualLocationObject = sessionStorage.getItem('manualLocationObject');
    if (manualLocationObject) {
      manualLocationObject = JSON.parse(manualLocationObject);
      const position = {
        coords: {
          latitude: parseInt(manualLocationObject.geometry.latitude),
          longitude: parseInt(manualLocationObject.geometry.longitude)
        }
      };
      this.searchDataService.getApplicableLocations(2500, position);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchDataService.getApplicableLocations(2500, position);
      }, (error) => {
        this.searchDataService.getApplicableLocations(2500, defaultPosition);
      });
    }
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
