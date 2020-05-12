import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLocationsComponent } from './recent-locations.component';

describe('RecentLocationsComponent', () => {
  let component: RecentLocationsComponent;
  let fixture: ComponentFixture<RecentLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
