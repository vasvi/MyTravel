import {Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalVariables} from './globalVariables';
import {MapService} from './services/map/map.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from './model/search-criteria';
import { SearchDataService } from './services/search-data.serivce';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'My Travel';
  currentLocation = '';
  newUserLocationObject: any;
  @ViewChild('manualLocationEntry', null) dialogRef: TemplateRef<any>;
  @ViewChild('manualLocationInput', {static: false}) locationInputViewChild: ElementRef;

  constructor(private router: Router,
              private ngZone: NgZone,
              private mapService: MapService, 
              private dialog: MatDialog,
              private searchService: SearchDataService) {
  }


  onManualLocationClicked() {

    const dialogRef = this.dialog.open(this.dialogRef, {
      height: '350px',
      width: '800px',
    });

    this.initAutoComplete();
  }

  initAutoComplete() {
    setTimeout(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: {country: 'in'}
      });
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        const place = autoComplete.getPlace();
        this.newUserLocationObject = place;
      });
    }, 300);
  }

  setManualLocation() {
    const manualLocationObject = {
      address: this.newUserLocationObject.formatted_address,
      geometry: {latitude: '', longitude: ''}
    };
    manualLocationObject.geometry.latitude = this.newUserLocationObject.geometry.location.lat();
    manualLocationObject.geometry.longitude = this.newUserLocationObject.geometry.location.lng();
    sessionStorage.setItem('manualLocationObject', JSON.stringify(manualLocationObject));
    this.currentLocation = manualLocationObject.address;
    this.dialog.closeAll();
  }

  onLocationChange(location) {
    this.ngZone.run(() => {
      let queryParamsObj = this.searchService.createLocationObject(location);
      this.router.navigate(['location'], {queryParams: Object.assign({}, queryParamsObj), skipLocationChange: true});
    })
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
                GlobalVariables.setGlobalVariable('currentCity', city);
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
