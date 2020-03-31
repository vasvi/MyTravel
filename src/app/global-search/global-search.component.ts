import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
declare const google;
@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {
  constructor() { }
  @ViewChild('input', { static: false }) inputViewChild: ElementRef;
  @Output() onLocationSelect: EventEmitter<any> = new EventEmitter();
  
  ngAfterViewInit(){
    this.initAutoComplete();
  }

  initAutoComplete(){
    let autoComplete = new google.maps.places.Autocomplete(this.inputViewChild.nativeElement);
    google.maps.event.addListener(autoComplete, 'place_changed', () => {
      let place = autoComplete.getPlace();
      this.onLocationSelect.emit(place);
    })
  }

  ngOnInit() {}

}
