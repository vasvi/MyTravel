import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapViewComponent } from './map-view.component';
import { ApplicableLocations } from '../../mockData/location-mock-data';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SearchDataService } from 'src/app/services/search-data.serivce';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;
  let locationData = ApplicableLocations;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapViewComponent ],
      imports: [RouterTestingModule, RouterTestingModule.withRoutes([{
        path: 'location',
        component: MapViewComponent
      }])],
      providers: []
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
  describe ('Test getPlaces', ()=>{
    it('test getPlaces', ()=>{
      let results = [];
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            // const spyP = spyOn(window['google']['maps']['places']['PlacesService'], '').and.returnValue(function(){
            //     arguments[0](results, 'OK')
            // })
            component.getPlaces(results);
            expect(google.maps.Map).toHaveBeenCalled();
    })
  })
  describe('navigateToLocation',()=>{
    it('test destination.navigateToLocation to equal true', ()=>{
        const searchService:SearchDataService = TestBed.get(SearchDataService);
        let results = [];
        spyOn(searchService, 'createLocationObject');
        const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
        component.navigateToLocation(results, 'OK');
        expect(searchService.createLocationObject).toHaveBeenCalled();
    })
})
});
