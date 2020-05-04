import { TestBed } from '@angular/core/testing';

import { DistanceMatrixMockService } from './distance-matrix-mock.service';

describe('DistanceMatrixMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistanceMatrixMockService = TestBed.get(DistanceMatrixMockService);
    expect(service).toBeTruthy();
  });
});
