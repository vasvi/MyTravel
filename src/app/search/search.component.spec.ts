import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Injectable, NO_ERRORS_SCHEMA} from '@angular/core';
import { SearchComponent } from './search.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { SearchDataService } from '../services/search-data.serivce';

import { MapService } from '../services/map/map.service';
import { SearchDataServiceMock } from '../mock-services/search-data-mock.service';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [{provide: SearchDataService, useClass: SearchDataServiceMock},
                  MapService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', ()=>{
    it('should test position user has provided', ()=>{
      const service: SearchDataService = TestBed.get(SearchDataService);
      const mapService: MapService = TestBed.get(MapService);
      const position = {
        coords:
          {latitude: 32, longitude: -96}
      };
      spyOn(service, 'getApplicableLocationData').and.returnValue(null);
      spyOn(service, 'getPosition').and.callFake(function(){
        arguments[0](position)
      })
      mapService.userLocationChangeEmitter.next(position);
      component.ngOnInit();
      expect(component.applicableLocations.position).toEqual(position);
    })

    it('should test default position', ()=>{
      const service: SearchDataService = TestBed.get(SearchDataService);
      const mapService: MapService = TestBed.get(MapService);
      const position = {
        coords:
          {latitude: 0, longitude: 0}
      };
      spyOn(service, 'getApplicableLocationData').and.returnValue(null);
      spyOn(service, 'getPosition').and.callFake(function(){
        arguments[0](null)
      })
      mapService.userLocationChangeEmitter.next(position);
      component.ngOnInit();
      expect(component.applicableLocations.position).toEqual(position);
    })
  })

  describe('refreshSearchView', ()=>{
    it('test applicable locations', ()=>{
      const data = {location:[], position:{
        coords:
          {latitude: 0, longitude: 0}
      }};
        component.refreshSearchView();
        expect(component.applicableLocations).toEqual(data)
    })
  })
});
