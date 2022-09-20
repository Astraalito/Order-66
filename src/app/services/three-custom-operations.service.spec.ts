import { TestBed } from '@angular/core/testing';

import { ThreeCustomOperationsService } from './three-custom-operations.service';

describe('ThreeCustomOperationsService', () => {
  let service: ThreeCustomOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeCustomOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
