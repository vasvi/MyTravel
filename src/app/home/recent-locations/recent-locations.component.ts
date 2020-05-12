import {Component, OnInit} from '@angular/core';
import LocationData from '../../search/location.json';
import {HttpService} from '../../services/http/http.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-recent-locations',
  templateUrl: './recent-locations.component.html',
  styleUrls: ['./recent-locations.component.scss']
})
export class RecentLocationsComponent implements OnInit {

  locations: any = [];
  userEmail = 'aayush.singh@gmail.com';

  constructor(private http: HttpService) {
  }

  ngOnInit() {

    this.getRecentLocations();
    this.locations = LocationData.sort((a, b) => {
      return a.latitude - b.latitude;
    });
    console.log(this.locations);
  }

  getRecentLocations() {
    this.http.makeGetRequest(environment.CLOUDFUNCTIONS.baseURL + '/getRequests?action=retrieveLocationData&emailId=' + this.userEmail).subscribe((response) => {
      console.log(response);
    });
  }

}
