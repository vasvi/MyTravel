import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {GlobalDestinationsObject,UserParameters} from '../model/search-criteria';
import LocationData from './location.json';
import {SearchDataService} from '../services/search-data.serivce';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  userParameters: UserParameters;
  applicableLocations = [];
  searchDataSubs: Subscription;

  globalDestinationsObject: GlobalDestinationsObject[] = LocationData;

  constructor(
    private snackBar: MatSnackBar,
    private searchDataService: SearchDataService) {

  }

  ngAfterViewInit() {
    /**
     * Initiate search here
     */
    this.searchDataSubs = this.searchDataService.getUserSearchData().subscribe((data) => {
      if (data) {
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.searchDataService.initSearch(data);
      } else if ( JSON.parse(sessionStorage.getItem('userData')) ) {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        this.searchDataService.initSearch(userData);
      } else 
        this.snackBar.open('Please search again!', '', {duration: 5000})
    });
  }

  ngOnDestroy() {
    if (this.searchDataSubs) {
      this.searchDataSubs.unsubscribe();
    }
  }
  
}
