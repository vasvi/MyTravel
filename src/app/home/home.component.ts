import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { SearchDataService } from '../services/search-data.serivce';
import { Subscription, BehaviorSubject } from 'rxjs';
import * as Constant from '../searchConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  availableLocationsSubs: Subscription;
  applicableDestinations: any;
  applicableLocations = [];
  constructor(
    private router: Router,
    private searchDataService: SearchDataService
  ) { }

  ngOnInit() {
    this.getDefaultLocations();
    this.applicableDestinations = new BehaviorSubject(this.applicableLocations);
  }

  navigateToSearch = () => {
    this.router.navigate(['search']);
  }

  getDefaultLocations(): void {
    const defaultPosition = {
      coords: {
        latitude: Constant.searchConstants.defaultLocation.latitude,
        longitude: Constant.searchConstants.defaultLocation.longitude
      }
    };

    navigator.geolocation.getCurrentPosition((position) => {
      // this.getApplicableLocations(500, position);
      this.searchDataService.getApplicableLocations(500, position);
      this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
        if (data && data.length > 0) {
          this.applicableDestinations.next(data);
        }
      });
    }, (error) => {
      console.log('No Location Available :: ' + error);
      this.searchDataService.getApplicableLocations(500, defaultPosition);
      this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
        if (data && data.length > 0) {
          this.applicableDestinations.next(data);
        }
      });
    });
  }
}
