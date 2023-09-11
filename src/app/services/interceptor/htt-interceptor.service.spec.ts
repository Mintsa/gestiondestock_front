import { TestBed } from '@angular/core/testing';

import { HttInterceptorService } from './htt-interceptor.service';

describe('HttInterceptorService', () => {
  let service: HttInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
