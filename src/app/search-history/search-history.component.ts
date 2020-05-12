import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { SearchHistoryService } from '../services/search-history/search-history.service';
import { UserParameters } from '../model/search-criteria';
import { Router } from '@angular/router';
import { GetUserInfo } from '../utilities';
declare const componentHandler: any;
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {

  selectedSearch: UserParameters;
  searchHistory: Array<any> = [];
  @ViewChild('dialog', null) mdlDialog: ElementRef;

  constructor(
    private searchHistoryService: SearchHistoryService,
    private router: Router
  ) { }

  goToSearch(event) {
    this.router.navigate(['search']);
  }

  showDialog(history) {
    this.selectedSearch = history;
    this.mdlDialog.nativeElement.showModal();
  }

  closeDialog() {
    this.mdlDialog.nativeElement.close();
  }

  getSearchHistory() {
    let user = GetUserInfo();
    if(!user) return;
    this.searchHistoryService.getSearchHistory(user.email)
      .subscribe(data => {
        this.searchHistory = data;
        componentHandler.upgradeAllRegistered();
      })
  }

  ngOnInit() {
    this.getSearchHistory();
  }

}
