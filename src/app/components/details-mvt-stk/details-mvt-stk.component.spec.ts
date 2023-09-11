import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMvtStkComponent } from './details-mvt-stk.component';

describe('DetailsMvtStkComponent', () => {
  let component: DetailsMvtStkComponent;
  let fixture: ComponentFixture<DetailsMvtStkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMvtStkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMvtStkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
