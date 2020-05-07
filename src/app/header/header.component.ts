import {Component, ElementRef, OnInit, TemplateRef, ViewChild, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MapService} from '../services/map/map.service';
import {SearchDataService} from '../services/search-data.serivce';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {PlacesMockService} from '../mock-services/places-mock/places-mock-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLocation = '';
  newUserLocationObject: any;
  currentRoute = '';
  routerEventSubscription: Subscription;
  @ViewChild('manualLocationEntry', null) dialogRef: TemplateRef<any>;
  @ViewChild('manualLocationInput', {static: false}) locationInputViewChild: ElementRef;


  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    private searchService: SearchDataService,
    private router: Router,
    private placesMock: PlacesMockService) {
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
      const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: {country: 'in'}
      });
      autoComplete.setFields(['reference', 'formatted_address', 'geometry.location', 'name', 'photos', 'id', 'place_id']);
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        let place;
        if (environment.useMock) {
          place = this.placesMock.getMockData().result;
        } else {
          place = autoComplete.getPlace();
        }
        this.newUserLocationObject = place;
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
    console.log(manualLocationObject);
    this.currentLocation = manualLocationObject.address;
    this.dialog.closeAll();
    this.mapService.userLocationChangeEmitter.next(manualLocationObject);
  }

  ngOnInit(): void {
    this.enableLocation();
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnDestroy = () => {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  };

  enableLocation() {

    this.searchService.getPosition((position) => {
      if (position) {
        this.mapService.reverseGeoCode(position.coords.latitude, position.coords.longitude).subscribe((response: any) => {
          const results = response.results;
          if (response.status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              for (const i in results) {
                if (results[i].types[0] === 'locality') {
                  const city = results[i].address_components[0].short_name;
                  console.log(results[i].address_components[0]);
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
