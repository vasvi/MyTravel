import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { searchHistoryData } from '../mockData/search-history.data';
import { SearchHistoryComponent } from './search-history.component';
import { SearchHistoryService } from '../services/search-history/search-history.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
class SearchHistoryMock {

  getSearchHistory(id) {
    return of(searchHistoryData);
  }
}

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchHistoryComponent],
      providers: [
        { provide: SearchHistoryService, useClass: SearchHistoryMock }
      ],
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
      expect(component.searchHistory.length).toBeGreaterThanOrEqual(1);
    })

  })

  it('should test closeDialog', () => {
    spyOn(component.mdlDialog.nativeElement, 'close');
    component.closeDialog();
    expect(component.mdlDialog.nativeElement.close).toHaveBeenCalled();
  })

  it('should test showDialog', () => {
    spyOn(component.mdlDialog.nativeElement, 'showModal');
    component.showDialog({ timestamp: 123 });
    expect(component.mdlDialog.nativeElement.showModal).toHaveBeenCalled();
    expect(component.selectedSearch.timestamp).toBe(123);
  })
});
