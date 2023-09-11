import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCmdFrsComponent } from './details-cmd-frs.component';

describe('DetailsCmdFrsComponent', () => {
  let component: DetailsCmdFrsComponent;
  let fixture: ComponentFixture<DetailsCmdFrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCmdFrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCmdFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
