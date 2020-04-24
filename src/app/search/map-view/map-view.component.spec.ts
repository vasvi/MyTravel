import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewComponent } from './map-view.component';
import { ApplicableLocations } from '../../mockData/location-mock-data';
import { By } from '@angular/platform-browser';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let locationData = ApplicableLocations;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewComponent);
    component = fixture.componentInstance;
    component.locationData = locationData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render map on data change', () => {
    spyOn(component, 'mapInitializer');
    component.ngOnChanges();
    expect(component.mapInitializer).toHaveBeenCalledTimes(1);
  });
});
