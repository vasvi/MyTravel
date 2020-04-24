import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-images',
  templateUrl: './location-images.component.html',
  styleUrls: ['./location-images.component.scss']
})
export class LocationImagesComponent implements OnInit {
  @Input('images') images: Array<string> = [];
  displayDialog: boolean = false;
  selectedImageIndex: number = 0;
  constructor() { }

  openDialog(imageIndex: number) {
    this.selectedImageIndex = imageIndex;
    this.displayDialog = true;
  }

  closeDialog(){
    this.displayDialog = false;
  }

  navigateNext() {
    this.selectedImageIndex = this.selectedImageIndex === this.images.length ? 0 : this.selectedImageIndex + 1
  }

  navigatePrev() {
    this.selectedImageIndex = this.selectedImageIndex === 0 ? this.images.length : this.selectedImageIndex - 1
  }


  ngAfterViewInit(){
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
