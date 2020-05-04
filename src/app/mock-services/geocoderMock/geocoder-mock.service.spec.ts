import { TestBed } from '@angular/core/testing';

import { GeocoderMockService } from './geocoder-mock.service';

describe('GeocoderMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocoderMockService = TestBed.get(GeocoderMockService);
    expect(service).toBeTruthy();
  });
});
