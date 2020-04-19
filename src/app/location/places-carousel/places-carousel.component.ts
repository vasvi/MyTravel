import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/model/search-criteria';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-places-carousel',
  templateUrl: './places-carousel.component.html',
  styleUrls: ['./places-carousel.component.scss']
})
export class PlacesCarouselComponent implements OnInit {
  @Input('places') places: Place;
  constructor() { }
  ngOnChanges() {
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    lazyLoad: true,
    slideBy: 3,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  

  opedDialog() {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

}
