import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationImagesComponent } from './location-images.component';

describe('LocationImagesComponent', () => {
  let component: LocationImagesComponent;
  let fixture: ComponentFixture<LocationImagesComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationImagesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test navigateNext', () => {
    component.images = ['1', '2', '3', '4'];
    component.selectedImageIndex = 0;
    component.navigateNext();
    expect(component.selectedImageIndex).toEqual(1);
    component.selectedImageIndex = 2;
    component.navigateNext();
    expect(component.selectedImageIndex).toEqual(3);
  })

  it('should test navigatePrev', () => {
    component.images = ['1', '2', '3', '4'];
    component.selectedImageIndex = 3;
    component.navigatePrev();
    expect(component.selectedImageIndex).toEqual(2);
    component.selectedImageIndex = 1;
    component.navigatePrev();
    expect(component.selectedImageIndex).toEqual(0);
  })

  it('should test image popup behaviour', () => {
    component.images = ['1', '2', '3'];
    component.closeDialog();
    expect(component.displayDialog).toEqual(false);

    component.openDialog(2);
    expect(component.selectedImageIndex).toEqual(2);
    expect(component.displayDialog).toEqual(true);
  })
});
