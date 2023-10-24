import { TestBed } from '@angular/core/testing';

import { MvstockService } from './mvstock.service';

describe('MvstockService', () => {
  let service: MvstockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvstockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
