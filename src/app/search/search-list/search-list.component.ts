import {Component, OnInit, Input} from '@angular/core';
import {Observable, BehaviorSubject, Subscription} from 'rxjs';
import {JsonPipe} from '@angular/common';
import { SearchDataService } from '../../services/search-data.serivce';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})

export class SearchListComponent implements OnInit {

  destinations: [];
  applicableDestinations: any;
  availableLocationsSubs: Subscription;

  constructor(private searchDataService: SearchDataService){}

  ngOnInit() {
    this.applicableDestinations = new BehaviorSubject(this.destinations);
    this.availableLocationsSubs = this.searchDataService.getApplicableLocationsSubs().subscribe(data => {
      if (data && data.length ) {
        this.destinations = data;
        console.log('data set in child' + this.destinations);
      }
    });
  }
}
