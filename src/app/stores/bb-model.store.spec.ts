import { TestBed } from '@angular/core/testing';

import { BbModelStore } from './bb-model.store';

describe('BbModelStore', () => {
  let service: BbModelStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbModelStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
