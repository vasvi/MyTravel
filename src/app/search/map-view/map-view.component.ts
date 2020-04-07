import {Component, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SearchDataService} from '../../services/search-data.serivce';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  availableLocationsSubs: Subscription;

  constructor(
    private searchDataService: SearchDataService
  ) {
  }

  ngAfterViewInit() {
    this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
      console.log('From MAP VIEW:  ' + data);
      this.mapInitializer(data.location, data.position);
    });
  }

  ngOnDestroy() {
    if (this.availableLocationsSubs) {
      this.availableLocationsSubs.unsubscribe();
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
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
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
        icon: 'https://cdn1.iconfinder.com/data/icons/web-55/32/web_1-24.png'
      });

      google.maps.event.addListener(destinationMarker, 'click', ((mark, j, destinationsLocations, map) => {
        return () => {
          infoWindow.setContent(destinationsLocations[j].location);
          infoWindow.open(map, mark);
        };
      })(destinationMarker, i, locations, this.map));
    }
  }

  /**
   *
   * @param locations
   * @param position
   */

  /*
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
 }*/
}
