import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouttonActionsComponent } from './boutton-actions.component';

describe('BouttonActionsComponent', () => {
  let component: BouttonActionsComponent;
  let fixture: ComponentFixture<BouttonActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BouttonActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BouttonActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
