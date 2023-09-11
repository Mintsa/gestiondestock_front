import { TestBed } from '@angular/core/testing';
import { SaveMediaTransverseService } from './save-media-transverse.service';



describe('SaveMediaTransverseService', () => {
  let service: SaveMediaTransverseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMediaTransverseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
