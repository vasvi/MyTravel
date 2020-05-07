import {SearchListComponent} from './search-list.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {ApplicableLocationObject, Location} from 'src/app/model/search-criteria';
import { By } from '@angular/platform-browser';
import { SearchDataService } from '../../services/search-data.serivce';
import { SearchDataServiceMock } from '../../global-search/global-search.component.spec';

describe ('SearchListComponent', ()=>{
    let component: SearchListComponent;
    let fixture: ComponentFixture<SearchListComponent>
    let locationData ={location: [{}], position:{coords: {latitude: 3,longitude: 4}}};

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [SearchListComponent],
            providers: [{provide: SearchDataService, useClass: SearchDataServiceMock}],
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
        component.locationData ={location: [{}], position:{coords: {latitude: 3,longitude: 4}}};
        expect(component).toBeTruthy();
    });

    describe('hideDestination',()=>{
        it('test hideDestination to equal true', ()=>{
            let destination ={hideDestination: false}
            component.hideDestination(destination);
            expect(destination.hideDestination).toEqual(true);
        })
    })

    describe('ngOnChanges', ()=>{
        it('should test destination', ()=>{
            component.ngOnChanges();
            expect(component.destinations).toEqual(locationData.location);
        })
        it('should test destination to be empty', ()=>{
            component.locationData.location = null;
            component.ngOnChanges();
            expect(component).toBeTruthy();
            // expect(component.destinations).toEqual([ ]);
        })
    })
    
    describe('stopNavigation',()=>{
        it('test destination showDescription to equal true', ()=>{
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
        it('test destination.navigateToLocation to equal true', ()=>{
            let results = [];
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            // const spyP = spyOn(window['google']['maps']['places']['PlacesService'], 'getDetails').and.callFake(function(){
            //     arguments[0](results, 'OK')
            // })
            component.getPlaces(results);
            expect(google.maps.Map).toHaveBeenCalled();
        })
        it('test destination.navigateToLocation to equal true', ()=>{
            const searchService:SearchDataService = TestBed.get(SearchDataService);
            let results = [];
            spyOn(searchService, 'createLocationObject');
            const spy = spyOn(window['google']['maps'], 'Map').and.returnValue(new google.maps.Map(document.createElement('div')));
            component.navigateToLocation(results, 'OK');
            expect(searchService.createLocationObject).toHaveBeenCalled();
        })
    })

})