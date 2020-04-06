import {Component, OnInit} from '@angular/core';
import {GlobalVariables} from './globalVariables';
import {MapService} from './services/map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Travel';
  currentLocation = '';

  constructor(private mapService: MapService) {
  }

  onLocationChange(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.enableLocation(false);
  }

  enableLocation(manuallyRequested) {

    navigator.geolocation.getCurrentPosition((position) => {
      GlobalVariables.setGlobalVariable('position', position);
      this.mapService.reverseGeoCode(position.coords.latitude, position.coords.longitude).subscribe((response: any) => {

        const results = response.results;
        if (response.status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            for (const i in results) {
              if (results[i].types[0] === 'locality') {
                const city = results[i].address_components[0].short_name;
                this.currentLocation = city;
              }
            }
          }
        }
      });

    }, (error) => {
      if (manuallyRequested) {
        alert('Please enable location setting on your device. If on browser, click the location icon on top and clear setting for the current site. Click here again after doing that')
      }
    });
  }
}
