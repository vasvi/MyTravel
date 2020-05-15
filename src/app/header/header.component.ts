import {Component, ElementRef, OnInit, TemplateRef, ViewChild, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MapService} from '../services/map/map.service';
import {SearchDataService} from '../services/search-data.serivce';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {PlacesMockService} from '../mock-services/places-mock/places-mock-service';
import { EventsService } from '../services/events/events.service';
import { SetSpreadSheetId, GetSpreadSheetId } from '../utilities';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() stateUpdated = new EventEmitter();
  currentLocation = '';
  newUserLocationObject: any;
  currentRoute = '';
  useMock : boolean;
  routerEventSubscription: Subscription;
  @ViewChild('manualLocationEntry', null) dialogRef: TemplateRef<any>;
  @ViewChild('manualLocationInput', {static: false}) locationInputViewChild: ElementRef;


  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    private searchService: SearchDataService,
    private router: Router,
    private placesMock: PlacesMockService,
    private eventService: EventsService,
    private snackBar: MatSnackBar) {
      this.useMock = environment.useMock;
  }


  onManualLocationClicked($event: MouseEvent) {

    $event.preventDefault();
    $event.stopPropagation();

    const dialogRef = this.dialog.open(this.dialogRef, {
      height: '350px',
      width: '800px',
    });

    this.initAutoComplete();
  }

  initAutoComplete() {
    setTimeout(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.locationInputViewChild.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: {country: 'in'}
      });
      autoComplete.setFields(['reference', 'formatted_address', 'geometry.location', 'name', 'photos', 'id', 'place_id']);
      google.maps.event.addListener(autoComplete, 'place_changed', () => {
        let place;
        if (environment.useMock) {
          place = this.placesMock.getMockData().result;
        } else {
          place = autoComplete.getPlace();
        }
        this.newUserLocationObject = place;
      });
    }, 300);
  }

  setManualLocation() {
    const manualLocationObject = {
      address: this.newUserLocationObject.formatted_address,
      latitude: '',
      longitude: ''
    };
    manualLocationObject.latitude = this.newUserLocationObject.geometry.location.lat();
    manualLocationObject.longitude = this.newUserLocationObject.geometry.location.lng();
    sessionStorage.setItem('manualLocationObject', JSON.stringify(manualLocationObject));
    console.log(manualLocationObject);
    this.currentLocation = manualLocationObject.address;
    this.dialog.closeAll();
    this.mapService.userLocationChangeEmitter.next(manualLocationObject);
  }

  ngOnInit(): void {
    this.enableLocation();
    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnDestroy = () => {
    if (this.routerEventSubscription) {
      this.routerEventSubscription.unsubscribe();
    }
  };

  updateSessionState = () => {
    this.stateUpdated.emit();
  }

  enableLocation() {

    this.searchService.getPosition((position) => {
      if (position) {
        this.mapService.reverseGeoCode(position.coords.latitude, position.coords.longitude).subscribe((response: any) => {
          const results = response.results;
          if (response.status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              for (const i in results) {
                if (results[i].types[0] === 'locality') {
                  const city = results[i].address_components[0].short_name;
                  console.log(results[i].address_components[0]);
                  this.currentLocation = city;
                }
              }
            }
          }
        });
      } else {
        alert('We Cannot work until you provide us your location. Please allow location or Add it manually');
      }
    });
  }

  shareData(){
    let spreadSheetId = GetSpreadSheetId();
    if(!spreadSheetId){
      this.eventService.createSpreadSheet().subscribe((data)=>{
        spreadSheetId = data.spreadsheetId;
        SetSpreadSheetId(spreadSheetId);
        this.createSheet(spreadSheetId);
      })
    }else {
      this.createSheet(spreadSheetId);
    }
  }

  createSheet(spreadSheetId){
    if (this.useMock){
      this.exportData(spreadSheetId, "Sheet1");
    }else {
      this.eventService.createSheet(spreadSheetId).subscribe((res)=>{
        const sheetName = res.replies[0].addSheet.properties.title;
        this.exportData(spreadSheetId,sheetName);
      });
    }
  }

  exportData(spreadsheetId, sheetName){
    if (this.useMock){
      this.snackBar.open(`Data exported successfully in ${sheetName} of spreadsheet with Id ${spreadsheetId}`,'', {duration: 5000});
    }else{
      this.eventService.exportDataToSheet(spreadsheetId,sheetName).subscribe((data)=>{
        this.snackBar.open(`Data exported successfully in ${sheetName} of spreadsheet with Id ${spreadsheetId}`,'', {duration: 5000});
      })
    }
  }
}
