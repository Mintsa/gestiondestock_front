import { TestBed } from '@angular/core/testing';

import { ApplicationGardService } from './application-gard.service';

describe('ApplicationGardService', () => {
  let service: ApplicationGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
