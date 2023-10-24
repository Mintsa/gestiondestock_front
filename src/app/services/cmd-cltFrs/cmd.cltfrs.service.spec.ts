import { TestBed } from '@angular/core/testing';
import { CmdCltfrsService } from './cmd-cltfrs.service';

describe('CmdCltfrsService', () => {
  let service: CmdCltfrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmdCltfrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
