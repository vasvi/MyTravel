import {Component, OnInit, Input} from '@angular/core';
import {ApplicableLocationObject} from 'src/app/model/search-criteria';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})

export class SearchListComponent implements OnInit {
  destinations = [];
  @Input() parentComponent: string;
  @Input() locationData: ApplicableLocationObject;

  constructor(){}

  ngOnInit() {
    this.destinations = this.locationData && this.locationData.location;
  }
}
