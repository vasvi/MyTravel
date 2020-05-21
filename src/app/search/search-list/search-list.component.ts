import {LocationService} from 'src/app/services/location/location.service';
import {Component, OnInit, Input, OnChanges, NgZone, ViewChild, ElementRef} from '@angular/core';
import {ApplicableLocationObject} from 'src/app/model/search-criteria';
import {Router} from '@angular/router';
import {SearchDataService} from '../../services/search-data.serivce';
import {environment} from '../../../environments/environment';
import {PlacesMockService} from '../../mock-services/places-mock/places-mock-service';
import {TranslateService} from '@ngx-translate/core';
import {GetUserSignedInState} from '../../utilities';

declare var componentHandler: any;


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})

export class SearchListComponent implements OnInit, OnChanges {
  @ViewChild('createEventDialog', {static: false}) createEventDialog: ElementRef;
  destinations = [];
  @Input() locationData: ApplicableLocationObject;
  selectedLocation = '';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private searchService: SearchDataService,
    private locationService: LocationService,
    private placesMock: PlacesMockService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    if (this.locationData && this.locationData.location) {
      this.destinations = this.locationData.location;
      this.destinations = this.destinations.sort((a, b) => a.details.distance.text.replace('km', '').replace(',', '') - b.details.distance.text.replace('km', '').replace(',', ''));
    }
  }

  getPlaces(destination) {
    if (environment.useMock) {
      const placesResp = this.placesMock.getMockData().result;
      this.navigateToLocation(placesResp, 'OK');
    } else {
      let map = new google.maps.Map(document.createElement('div'));
      var placesService = new google.maps.places.PlacesService(map);
      placesService.getDetails(
        {
          placeId: destination.placeId,
          fields: ['reference', 'formatted_address', 'geometry.location', 'name', 'photos', 'id', 'place_id']
        }, (data, status) => this.navigateToLocation(data, status));
    }
  }

  hideDestination(destination) {
    destination.hideDestination = true;
  }

  ngOnChanges() {
    this.destinations = this.locationData && this.locationData.location ? this.locationData.location : [];
  }

  navigateToLocation(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.ngZone.run(() => {
        let queryParamsObj = this.searchService.createLocationObject(results);
        this.locationService.setLocationsDetails(queryParamsObj);
        this.router.navigate(['location'], {queryParams: Object.assign({}, {name: queryParamsObj.name}), skipLocationChange: false});
      })
    }
  }

  stopNavigation(event, destination) {
    destination.showDescription = !destination.showDescription;
    event.preventDefault();
    event.stopPropagation();
  }

  createEvent = (destination) => {
    this.selectedLocation = destination.location;
    if (this.createEventDialog) {
      this.createEventDialog.nativeElement.showModal();
    }
  }

  closeModal = () => {
    if (this.createEventDialog && this.createEventDialog.nativeElement.open) {
      this.createEventDialog.nativeElement.close();
    }
  }

  isUSerSignedIn = () => {
    return GetUserSignedInState();
  }
}
