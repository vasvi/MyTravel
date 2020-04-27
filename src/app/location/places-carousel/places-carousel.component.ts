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
  constructor() { }

  ngOnChanges() {
    this.setItemsPerPage();
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

  setItemsPerPage() {
    let screenWidth = screen.width;
    if (screenWidth <= 400) {
      this.itemsPerPage = 1;
    }
    if (screenWidth > 400 && screenWidth <= 740) {
      this.itemsPerPage = 3;
    }
    if (screenWidth > 740) {
      this.itemsPerPage = 5;
    }
  }

  carouselPrev(): boolean {
    if (this.currentCarouselIndex === 0) {
      return false;
    }
    this.currentCarouselIndex--;
  }

  carouselNext() {
    if (this.currentCarouselIndex >= Math.ceil(this.images.length / this.itemsPerPage)){
      return false;
    }
    this.currentCarouselIndex++;
  }

  opedDialog() {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

}
