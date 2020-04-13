import {Component, OnInit} from '@angular/core';
import {GlobalDestinationsObject, ApplicableLocationObject, Position} from '../model/search-criteria';
import LocationData from './location.json';
import {SearchDataService} from '../services/search-data.serivce';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  applicableLocations: ApplicableLocationObject;

  globalDestinationsObject: GlobalDestinationsObject[] = LocationData;

  constructor(
    private searchDataService: SearchDataService) {
  }

  ngOnInit() {
    this.applicableLocations = this.searchDataService.getApplicableLocationData();

    // Get data from session
    if (!this.applicableLocations) {
      let location = JSON.parse(sessionStorage.getItem('location'));
      let latitude = JSON.parse(sessionStorage.getItem('position.latitude'));
      let longitude = JSON.parse(sessionStorage.getItem('position.longitude'));

      let position: Position = {
        coords: {
          latitude,
          longitude
        }
      }
        
      this.applicableLocations = {
        location,
        position
      }
    }
  }  
}
