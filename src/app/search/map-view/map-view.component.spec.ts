import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewComponent } from './map-view.component';
import { ApplicableLocations } from '../../mockData/location-mock-data';

fdescribe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let locationData = ApplicableLocations;

    /*(window as any).google = {
    maps: {
      InfoWindow() {},
      Map: () => {},
      event: {
        addListener: (param, eventName, callback) => {
          callback();
        }
      }

    }
  };*/

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

  it('should render map with locations', () => {
    
  })
});
