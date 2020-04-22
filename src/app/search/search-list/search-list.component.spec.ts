import {SearchListComponent} from './search-list.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {ApplicableLocationObject, Location} from 'src/app/model/search-criteria';
import { By } from '@angular/platform-browser';



describe ('SearchListComponent', ()=>{
    let component: SearchListComponent;
    let fixture: ComponentFixture<SearchListComponent>
    let locationData ={location: [{}], position:{coords: {latitude: 3,longitude: 4}}};
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations: [SearchListComponent],
            imports: [RouterTestingModule]
        })
        .compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchListComponent);
        component = fixture.componentInstance;
        component.locationData = locationData;
        // window['google'] = {maps:{places: {
        // 	AutocompleteService: function(){

        //     },
        //     PlacesService: function(obj){
        //         return {
        //             PlacesServiceStatus: {
        //                 OK: true
        //             },
        //             textSearch: function(query){
        //                 return [];
        //             },
        //             nearbySearch: function(query){
        //                 return [];
        //             }
        //         };	
        // }};
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

    xdescribe('navigateToLocation',()=>{
        it('test destination.navigateToLocation to equal true', ()=>{
            let results = [];

            spyOn(google.maps.places, 'PlacesService');
            component.getPlaces(results);
            expect(component).toBeTruthy();
        })
    })

})