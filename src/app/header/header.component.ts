import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MapService} from '../services/map/map.service';
import {SearchDataService} from '../services/search-data.serivce';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentLocation = '';
  newUserLocationObject: any;
  @ViewChild('manualLocationEntry', null) dialogRef: TemplateRef<any>;
  @ViewChild('manualLocationInput', {static: false}) locationInputViewChild: ElementRef;


  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    private searchService: SearchDataService) {
  }


  onManualLocationClicked($event: MouseEvent) {

    $event.preventDefault();
    $event.stopPropagation();

    const dialogRef = this.dialog.open(this.dialogRef, {
      height: '350px',
      width: '800px',
    });

    this.initAutoComplete();
  }

  initAutoComplete() {
    setTimeout(() => {
      console.log(google);
      const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: {country: 'in'}
      });
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        const place = autoComplete.getPlace();
        this.newUserLocationObject = place;
        console.log(place);

      });
    }, 300);
  }

  setManualLocation() {
    const manualLocationObject = {
      address: this.newUserLocationObject.formatted_address,
      latitude: '',
      longitude: ''
    };
    manualLocationObject.latitude = this.newUserLocationObject.geometry.location.lat();
    manualLocationObject.longitude = this.newUserLocationObject.geometry.location.lng();
    sessionStorage.setItem('manualLocationObject', JSON.stringify(manualLocationObject));
    this.currentLocation = manualLocationObject.address;
    this.dialog.closeAll();
    this.mapService.userLocationChangeEmitter.next(manualLocationObject);
  }

  ngOnInit(): void {
    this.enableLocation();
  }

  enableLocation() {

    this.searchService.getPosition((position) => {
      if (position) {
        this.mapService.reverseGeoCode(position.coords.latitude, position.coords.longitude).subscribe((response: any) => {
          console.log('Hi');
          console.log(response.status, google.maps.GeocoderStatus.OK);
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
      } else {
        alert('We Cannot work until you provide us your location. Please allow location or Add it manually');
      }
    });
  }
}
