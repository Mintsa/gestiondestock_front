import { TestBed } from '@angular/core/testing';

import { ChangePassWordService } from './change-pass-word.service';

describe('ChangePassWordService', () => {
  let service: ChangePassWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePassWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
