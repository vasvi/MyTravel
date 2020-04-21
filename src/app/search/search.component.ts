import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {GlobalDestinationsObject, ApplicableLocationObject, Position, UserParameters} from '../model/search-criteria';
import LocationData from './location.json';
import {SearchDataService} from '../services/search-data.serivce';
import {MapService} from '../services/map/map.service';
import * as constant from '../searchConstants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('editDialog', {static: false}) editDialog: ElementRef;
  applicableLocations: ApplicableLocationObject;
  globalDestinationsObject: GlobalDestinationsObject[] = LocationData;
  searchQuery: UserParameters;

  constructor(
    private searchDataService: SearchDataService, private mapService: MapService) {
  }

  ngOnInit() {
    this.applicableLocations = this.searchDataService.getApplicableLocationData();

    // Get user form data from session
    this.searchQuery = sessionStorage.getItem('userSearch') && JSON.parse(sessionStorage.getItem('userSearch'));

    // Get data from session
    if (!this.applicableLocations) {
      const location = JSON.parse(sessionStorage.getItem('location'));
      this.searchDataService.getPosition((position) => {
        if (position) {
          this.applicableLocations = {
            location,
            position
          };
        } else {
          const defaultPosition: Position = {
            coords: {
              latitude: constant.searchConstants.defaultLocation.latitude,
              longitude: constant.searchConstants.defaultLocation.longitude
            }
          };
          this.applicableLocations = {
            location,
            position: defaultPosition
          };
        }
      });
    }
    this.mapService.userLocationChangeEmitter.asObservable().subscribe(() => {
      let userFormData: any = sessionStorage.getItem('userSearch');
      if (userFormData) {
        try {
          userFormData = JSON.parse(userFormData);
          this.searchDataService.initSearch(userFormData);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  refreshSearchView = () => {
    this.applicableLocations = this.searchDataService.getApplicableLocationData();
    this.closeModal();
  }

  showEditForm = () => {
    if (this.editDialog) {
      this.editDialog.nativeElement.showModal();
    }
  }

  closeModal = () => {
    console.log(this.editDialog.nativeElement.open);
    if (this.editDialog && this.editDialog.nativeElement.open) {
      this.editDialog.nativeElement.close();
    }
  }
}
