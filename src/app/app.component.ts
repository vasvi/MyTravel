import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from './model/search-criteria';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Travel';

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  private createLocationObject(location): Location {
    let formattedLocationData: Location = {
      name: location.name,
      formatted_address : location.formatted_address,
      photos: (() => {
        if (Array.isArray(location.photos)) {
          return location.photos.map(o => {
            return o.getUrl();
          });
        }
        return [];
      })(),
      id: location.id,
      place_id: location.place_id,
      reference: location.reference,
      geometry: [
        location.geometry.location.lat(),
        location.geometry.location.lng()
      ]
    };
    return formattedLocationData
  }

  onLocationChange(location) {
    this.ngZone.run(() => {
      let queryParamsObj = this.createLocationObject(location);
      this.router.navigate(['location'], { queryParams: Object.assign({}, queryParamsObj), skipLocationChange: true });
    })
  }


}
