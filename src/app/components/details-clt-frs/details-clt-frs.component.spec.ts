import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCltFrsComponent } from './details-clt-frs.component';

describe('DetailsCltFrsComponent', () => {
  let component: DetailsCltFrsComponent;
  let fixture: ComponentFixture<DetailsCltFrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCltFrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCltFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
