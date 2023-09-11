import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvtskComponent } from './mvtsk.component';

describe('MvtskComponent', () => {
  let component: MvtskComponent;
  let fixture: ComponentFixture<MvtskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvtskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MvtskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
