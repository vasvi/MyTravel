import {Component, OnInit, Input, OnChanges, NgZone} from '@angular/core';
import {ApplicableLocationObject, Location} from 'src/app/model/search-criteria';
import { Router } from '@angular/router';
import { SearchDataService } from '../../services/search-data.serivce';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})

export class SearchListComponent implements OnInit, OnChanges {
  destinations = [];
  @Input() parentComponent: string;
  @Input() locationData: ApplicableLocationObject;

  constructor(private router: Router,
              private ngZone: NgZone,
              private searchService: SearchDataService){}

  ngOnInit() {
    this.destinations = this.locationData && this.locationData.location;
  }

  getPlaces(destination){  
    let map = new google.maps.Map(document.createElement('div'));
    var placesService = new google.maps.places.PlacesService(map);
    placesService.getDetails({placeId:destination.placeId}, (data,status)=> this.navigateToLocation(data,status));
  }
  
  hideDestination(destination){
    destination.hideDestination = true;
  }

  ngOnChanges() {
    this.destinations = this.locationData && this.locationData.location ? this.locationData.location : this.destinations;
  }

  navigateToLocation(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.ngZone.run(() => {
        let queryParamsObj = this.searchService.createLocationObject(results);
        this.router.navigate(['location'], {queryParams: Object.assign({}, queryParamsObj), skipLocationChange: true});
      })
    }
  }

  stopNavigation(event, destination){
    destination.showDescription =!destination.showDescription;
    event.preventDefault();
    event.stopPropagation();
  }

}
