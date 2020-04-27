import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../model/search-criteria';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-places-carousel',
  templateUrl: './places-carousel.component.html',
  styleUrls: ['./places-carousel.component.scss']
})
export class PlacesCarouselComponent implements OnInit {
  @Input('places') places: Place[];
  options: any;
  currentCarouselIndex: number = 0;
  itemsPerPage: number = 5;
  disableNext: boolean = false;
  constructor() { }

  ngOnChanges() {
  }

  customOptions: OwlOptions = {
    loop: true,
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
        items: 1
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

  carouselPrev(): boolean {
    if (this.currentCarouselIndex === 0) {
      return false;
    }
    this.currentCarouselIndex--;
  }

  carouselNext() {
    if (this.currentCarouselIndex >= Math.ceil(this.places.length / this.itemsPerPage)){
      return false;
    }
    this.currentCarouselIndex++;
  }

  onCarouselChanged(event){
    if(event.startPosition === 3){
      this.currentCarouselIndex = 0;
    }
    // console.log(event);
    // console.log(this.places.length);
  }

  opedDialog() {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

}
