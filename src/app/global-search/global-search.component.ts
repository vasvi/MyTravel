import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
declare const google;
@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {
  constructor() { }
  @ViewChild('locationInput', { static: false }) locationInputViewChild: ElementRef;
  @Output() onLocationChange: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {
    this.initAutoComplete();
  }

  initAutoComplete() {
    setTimeout(() => {
      let config = {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' }
      }
      let autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement, config);
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        let place = autoComplete.getPlace();
        this.onLocationChange.emit(place);
      })
    }, 300);
  }

  ngOnInit() { }

}
