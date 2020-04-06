import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {GlobalDestinationsObject,UserParameters} from '../model/search-criteria';
import LocationData from './location.json';
import {SearchDataService} from '../services/search-data.serivce';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  userParameters: UserParameters;
  applicableLocations = [];
  applicableDestinations: any;
  searchDataSubs: Subscription;
  availableLocationsSubs: Subscription;

  globalDestinationsObject: GlobalDestinationsObject[] = LocationData;

  constructor(
    private snackBar: MatSnackBar,
    private searchDataService: SearchDataService) {

  }

  ngOnInit() {
    this.applicableDestinations = new BehaviorSubject(this.applicableLocations);
  }

  ngAfterViewInit() {
    /**
     * Init search here
     */
    this.searchDataSubs = this.searchDataService.getUserSearchData().subscribe((data) => {
      if (data) {
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.searchDataService.initSearch(data);
      } else if ( JSON.parse(sessionStorage.getItem('userData')) ) {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        this.searchDataService.initSearch(userData);
      } else 
        this.snackBar.open('Please search again!', '', {duration: 5000})
    });

    // Subscribe to location data
    this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
      if(data){
        console.log('DATA' + data);
        this.applicableLocations = data.location;
        this.mapInitializer(this.applicableLocations, data.position);
        this.applicableDestinations.next(this.applicableLocations);
        console.log('destinations set in parent');
      }
    });
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
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.BOUNCE
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
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(destinationMarker, 'click', ((mark, j, destinationsLocations, map) => {
        return () => {
          infoWindow.setContent(destinationsLocations[j].location);
          infoWindow.open(map, mark);
        };
      })(destinationMarker, i, locations, this.map));
    }
  }

}
