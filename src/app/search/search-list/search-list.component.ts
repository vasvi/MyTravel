import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ApplicableLocationObject} from 'src/app/model/search-criteria';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})

export class SearchListComponent implements OnInit, OnChanges {
  destinations = [];
  @Input() parentComponent: string;
  @Input() locationData: ApplicableLocationObject;

  constructor(){}

  ngOnInit() {
    this.destinations = this.locationData && this.locationData.location;
  }

  hideDestination(destination){
    destination.hideDestination = true;
  }
  
  ngOnChanges() {
    this.destinations = this.locationData && this.locationData.location;
  }
}
