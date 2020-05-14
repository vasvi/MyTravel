import {Component, OnInit} from '@angular/core';
import LocationData from '../../search/location.json';
import {HttpService} from '../../services/http/http.service';
import {environment} from '../../../environments/environment';
import {GetUserInfo} from '../../utilities';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-recent-locations',
  templateUrl: './recent-locations.component.html',
  styleUrls: ['./recent-locations.component.scss']
})
export class RecentLocationsComponent implements OnInit {

  locations: any = [];
  recentLocations: any = [];
  userEmail = 'aayush.singh@gmail.com';
  options: any;
  recentLocationAvailable = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    lazyLoad: true,
    slideBy: 1,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false,
    autoplay: true
  };

  constructor(private http: HttpService) {
  }

  ngOnInit() {

    this.getRecentLocations();
    this.locations = LocationData.sort((a, b) => {
      return a.latitude - b.latitude;
    });
    console.log(this.locations);
  }

  updateSessionState() {
    this.recentLocationAvailable = false;
    this.userEmail = undefined;
    this.recentLocations = [];
    this.ngOnInit();
  }

  getRecentLocations() {

    const userInfo = GetUserInfo();
    if (userInfo) {
      this.userEmail = userInfo.email;
      this.http.makeGetRequest(environment.CLOUDFUNCTIONS.baseURL + '/getApi?action=retrieveLocationData&emailId=' + this.userEmail).subscribe((response) => {
        if (response && response.length > 0) {
          this.recentLocationAvailable = true;
          this.locations.forEach((ele) => {
            response.forEach((loc) => {
              if (loc.locationData === ele.placeId) {
                this.recentLocations.push(ele);
              }
            });
          });
        } else {
        }
      });
    } else {
      this.userEmail = undefined;
    }
  }

}
