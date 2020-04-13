import {Component, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import {ApplicableLocationObject} from '../../model/search-criteria';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  @Input() locationData: ApplicableLocationObject;
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;

  constructor() { }

  ngAfterViewInit() {
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
        return () => {
          infoWindow.setContent(destinationsLocations[j].location);
          infoWindow.open(map, mark);
        };
      })(destinationMarker, i, locations, this.map));
    }
  }
}
