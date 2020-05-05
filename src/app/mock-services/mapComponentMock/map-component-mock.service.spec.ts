import { TestBed } from '@angular/core/testing';

import { MapComponentMockService } from './map-component-mock.service';

describe('MapComponentMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapComponentMockService = TestBed.get(MapComponentMockService);
    expect(service).toBeTruthy();
  });
});
