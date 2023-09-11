import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMvtskArticleComponent } from './details-mvtsk-article.component';

describe('DetailsMvtskArticleComponent', () => {
  let component: DetailsMvtskArticleComponent;
  let fixture: ComponentFixture<DetailsMvtskArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMvtskArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMvtskArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
