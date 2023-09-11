import { TestBed } from '@angular/core/testing';

import { UdserService } from './udser.service';

describe('UdserService', () => {
  let service: UdserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UdserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
