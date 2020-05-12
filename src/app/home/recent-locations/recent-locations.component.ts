import {Component, OnInit} from '@angular/core';
import LocationData from '../../search/location.json';

@Component({
  selector: 'app-recent-locations',
  templateUrl: './recent-locations.component.html',
  styleUrls: ['./recent-locations.component.scss']
})
export class RecentLocationsComponent implements OnInit {

  locations: any = [];

  constructor() {
  }

  ngOnInit() {
    this.locations = LocationData.sort((a, b) => {
      return a.latitude - b.latitude;
    });
    console.log(this.locations);
  }

}
