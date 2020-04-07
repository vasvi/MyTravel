import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {Observable, BehaviorSubject, Subscription} from 'rxjs';
import {JsonPipe} from '@angular/common';
import { SearchDataService } from '../../services/search-data.serivce';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})

export class SearchListComponent implements OnInit {

  destinations = [];
  applicableDestinations: any;
  availableLocationsSubs: Subscription;
  @Input() parentComponent: string;

  constructor(private searchDataService: SearchDataService,
    private ref: ChangeDetectorRef){}

  ngOnInit() {
    this.applicableDestinations = new BehaviorSubject(this.destinations);
    this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
      if (data && data.location) {
        this.destinations = data.location;
        setTimeout(() => {
          this.ref.detectChanges();
      }, 250);
        console.log('data set in child' + this.destinations);
      }
    });
  }
}
