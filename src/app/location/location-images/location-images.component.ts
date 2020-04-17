import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-location-images',
  templateUrl: './location-images.component.html',
  styleUrls: ['./location-images.component.scss']
})
export class LocationImagesComponent implements OnInit {
  @Input('images') images: Array<string>;
  displayDialog: boolean = false;
  selectedImageIndex: number = 0;
  constructor(
    private matDialog: MatDialog
  ) { }

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
    console.log(this.images);
  }

}
