import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { searchHistoryData } from '../mockData/search-history.data';
import { SearchHistoryComponent } from './search-history.component';
import { SearchHistoryService } from '../services/search-history/search-history.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
class SearchHistoryMock {

  getSearchHistory(id) {
    debugger
    return of(searchHistoryData);
  }
}

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHistoryComponent],
      providers: [{ provide: SearchHistoryService, useClass: SearchHistoryMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call component.getSearchHistory on ngOnInInit', () => {
    spyOn(component, 'getSearchHistory');
    component.ngOnInit();
    expect(component.getSearchHistory).toHaveBeenCalled();
  })

  describe('getSearchHistory', () => {
    let service: SearchHistoryService;
    beforeEach(() => {
      service = TestBed.get(SearchHistoryService);
      fixture.detectChanges();
      sessionStorage.setItem('user_email', 'gpantbiz@gmail.com');
    })

    it('should set searchHistory', () => {
      component.getSearchHistory();
      fixture.detectChanges();
      expect(component.searchHistory.length).toBeGreaterThanOrEqual(1);
    })

  })
});
