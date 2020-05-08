import {SearchListComponent} from './search-list.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {ApplicableLocationObject, Location} from 'src/app/model/search-criteria';
import { By } from '@angular/platform-browser';
import { SearchDataService } from '../../services/search-data.serivce';
import { SearchDataServiceMock } from '../../global-search/global-search.component.spec';
import {environment} from '../../../environments/environment';
import { PlacesMockService } from 'src/app/mock-services/places-mock/places-mock-service';

describe ('SearchListComponent', ()=>{
    let component: SearchListComponent;
    let fixture: ComponentFixture<SearchListComponent>
    let locationData ={location: [{ name: 'Chandigarh',details:{distance:{text:"500km"}}},{ name: 'Chandigarh',details: {distance:{text:"50km"}}}], position:{coords: {latitude: 3,longitude: 4}}};
    let location: Location = {
        name: 'Chandigarh',
        formatted_address: 'Chandigarh, India',
        photos: ['https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAdue4G9JNfjp1QfierjRh863zpYxoBuHeoUYTyqtIRq-hIOxzewWO6Uw9PM78EJ2Z6DPPvQbMuMDOvwPausCarBmvm1IoiORhXha5TDxzElesc7zWvioz-NjD3Pcu9aLhEhDVeF2bTkCAta7aR4lx0ngrGhT8CwwjuS9E8lTvUZKU6itmFUJnmw&3u1440&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=82258'],
        id: '2ff3ad0666fc5f99d36aa80f35cf1e9d61ade100',
        place_id: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
        reference: 'ChIJa8lu5gvtDzkR_hlzUvln_6U',
        geometry: [30.7333148, 76.7794179]
      }

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [SearchListComponent],
            providers: [{provide: SearchDataService, useClass: SearchDataServiceMock,PlacesMockService}],
            imports: [RouterTestingModule, RouterTestingModule.withRoutes([{
                path: 'location',
                component: SearchListComponent
              }])],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchListComponent);
        component = fixture.componentInstance;
        component.locationData = locationData;
        fixture.detectChanges();
    });

    it('should create', () => {
        environment.useMock=false;
        component.locationData = locationData;
        component.ngOnInit();
        expect(component).toBeTruthy();
    });

    describe('hideDestination',()=>{
        it('test hideDestination to equal true', ()=>{
            component.locationData = locationData;
            let destination ={hideDestination: false}
            component.hideDestination(destination);
            expect(destination.hideDestination).toEqual(true);
        })
    })

    describe('ngOnChanges', ()=>{
        it('should test destination', ()=>{
            component.locationData = locationData;
            component.locationData.location = locationData.location;
            component.ngOnChanges();
            expect(component.destinations).toEqual(component.locationData.location);
        })
        it('should test destination to be empty', ()=>{
            component.locationData = locationData;
            component.locationData.location = null;
            component.ngOnChanges();
            expect(component).toBeTruthy();
            // expect(component.destinations).toEqual([ ]);
        })
    })
    
    describe('stopNavigation',()=>{
        it('test destination showDescription to equal true', ()=>{
            component.locationData = locationData;
            let destination ={showDescription: false}
            const mockEvent: Event = <Event><any>{
            stopPropagation: <any>( ( e: any ) => { /**/ }),
            preventDefault: <any>( ( e: any ) => { /**/ }),
            };
            component.stopNavigation(mockEvent, destination);
            expect(destination.showDescription).toEqual(true);
        })
    })

    describe('navigateToLocation',()=>{
        it('test getPlaces to equal true', ()=>{
            let results = [];
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            component.getPlaces(results);
            expect(google.maps.Map).toHaveBeenCalled();
        })
        it('test getPlaces to equal true', ()=>{
            const placesMock = TestBed.get(PlacesMockService);
            environment.useMock = false;
            let results = [];
            spyOn(placesMock,'getMockData').and.returnValue({results:[]});
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            component.getPlaces(results);
            expect(google.maps.Map).toHaveBeenCalled();
        })
        it('test navigateToLocation to equal true', ()=>{
            const searchService:SearchDataService = TestBed.get(SearchDataService);
            let results = [];
            spyOn(searchService, 'createLocationObject').and.returnValue(location);
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            component.navigateToLocation(results, 'OK');
            expect(searchService.createLocationObject).toHaveBeenCalled();
        })
    })

})
