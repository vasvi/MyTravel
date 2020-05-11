import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SearchHistoryService } from '../services/search-history/search-history.service';
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {

  searchHistory: Array<any> = [];
  constructor(
    private searchHistoryService: SearchHistoryService
  ) {}

  getSearchHistory(){
    let emailId = sessionStorage.getItem('user_email');
    this.searchHistoryService.getSearchHistory(emailId)
    .subscribe(data => {
      this.searchHistory = data;
      console.log(this.searchHistory)
    })
  }

  ngOnInit() {
    this.getSearchHistory();
  }

}
