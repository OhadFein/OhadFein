import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPromoReviewComponent } from './star-promo-review.component';

describe('StarPromoReviewComponent', () => {
  let component: StarPromoReviewComponent;
  let fixture: ComponentFixture<StarPromoReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPromoReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPromoReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
