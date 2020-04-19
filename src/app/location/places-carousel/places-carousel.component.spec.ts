import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCarouselComponent } from './places-carousel.component';

describe('PlacesCarouselComponent', () => {
  let component: PlacesCarouselComponent;
  let fixture: ComponentFixture<PlacesCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
