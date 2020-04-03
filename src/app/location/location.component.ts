import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../model/search-criteria';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainerViewChild: ElementRef;
  map: google.maps.Map;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  targetLocation: Location;

  ngAfterViewInit() {
    this.initializeGoogleMap();
  }

  subscribeToRouterEvents() {
    this.activatedRoute.queryParams.subscribe((params: Location) => {
      if (params) {
        this.targetLocation = params;
        this.targetLocation.geometry[0] = parseFloat(this.targetLocation.geometry[0]);
        this.targetLocation.geometry[1] = parseFloat(this.targetLocation.geometry[1]);
        this.changeMapCenter(this.targetLocation.geometry[0], this.targetLocation.geometry[1]);

      }
    })
  }

  changeMapCenter(lat, lng) {
    if (this.map) {
      this.map.setCenter({ lat, lng });
    }
  }

  initializeGoogleMap() {
    this.map = new google.maps.Map(this.mapContainerViewChild.nativeElement, {
      center: {
        lat: this.targetLocation.geometry[0],
        lng: this.targetLocation.geometry[1]
      },
      zoom: 8
    });
  }


  ngOnInit() {
    this.subscribeToRouterEvents();
  }

}
