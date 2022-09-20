import { TestBed } from '@angular/core/testing';

import { PageController } from './page-controller';

describe('PageController', () => {
  let service: PageController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
