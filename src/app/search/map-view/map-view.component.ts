import {Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, NgZone} from '@angular/core';
import {ApplicableLocationObject} from '../../model/search-criteria';
import {SearchDataService} from '../../services/search-data.serivce';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PlacesMockService} from '../../mock-services/places-mock/places-mock-service';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit, OnChanges {
  @Input() locationData: ApplicableLocationObject;
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;


  constructor(private ngZone: NgZone,
              private searchService: SearchDataService,
              private router: Router,
              private placesMock: PlacesMockService) {
  }

  ngAfterViewInit() {
    if (this.locationData.location && this.locationData.location.length && this.locationData.position) {
      this.mapInitializer(this.locationData.location, this.locationData.position);
    }
  }

  ngOnChanges() {
    if (this.locationData.location && this.locationData.location.length && this.locationData.position) {
      this.mapInitializer(this.locationData.location, this.locationData.position);
    }
  }

  /**
   *
   * @param locations
   * @param position
   */
  mapInitializer(locations, position) {

    const infoWindow = new google.maps.InfoWindow();
    let destinationMarker;

    const coordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    const mapOptions = this.mapOptions = {
      center: coordinates,
      zoom: 5,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: []
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.BOUNCE,
      icon: 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/157_Twitter_Location_Map-32.png'
    });

    google.maps.event.addListener(marker, 'click', (() => {
      return () => {
        infoWindow.setContent('Your current location');
        infoWindow.open(this.map, marker);
      };
    })());

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker.setMap(this.map);

    for (let i = 0; i < locations.length; i++) {
      destinationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: 'https://cdn0.iconfinder.com/data/icons/stuttgart/32/milestone.png'
      });

      google.maps.event.addListener(destinationMarker, 'click', ((mark, j, destinationsLocations, map) => {
        const contentString = this.getInfoWindowContent(destinationsLocations, j);
        return () => {
          infoWindow.setContent(contentString);
          infoWindow.open(map, mark);
          google.maps.event.addListener(infoWindow, 'domready', () => {
            const clickableItem = document.getElementById('view-detail-btn');
            clickableItem.addEventListener('click', () => {
              this.getPlaces(destinationsLocations[j]);
            });
          });
        };
      })(destinationMarker, i, locations, this.map));
    }
  }

  getPlaces(destination) {
    if (environment.useMock) {
      const placesResp = this.placesMock.getMockData().result;
      this.navigateToLocation(placesResp, 'OK');
    } else {
      const map = new google.maps.Map(document.createElement('div'));
      const placesService = new google.maps.places.PlacesService(map);

      placesService.getDetails(
        {
          placeId: destination.placeId,
          fields: ['reference', 'formatted_address', 'geometry.location', 'name', 'photos', 'id', 'place_id']
        },
        (data, status) => this.navigateToLocation(data, status));
    }
  }

  navigateToLocation(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.ngZone.run(() => {
        const queryParamsObj = this.searchService.createLocationObject(results);
        console.log('results--' + results);
        this.router.navigate(['location'], {queryParams: Object.assign({}, queryParamsObj), skipLocationChange: true});
      });
    }
  }

  getInfoWindowContent(destinationsLocations, j): string {
    const contentString = '<div id="iw-container" class="location-info"><img src=' + destinationsLocations[j].imageUrl + '/>' +
      '<p class="name" >' + destinationsLocations[j].location + '</p>' +
      '<p >' + destinationsLocations[j].details.distance.text + '</p>' +
      '<button id="view-detail-btn" class="mdl-button mdl-js-button">View Details</button></div>';
    return contentString;
  }
}
