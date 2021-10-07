import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dsapp-star-promo-review',
  templateUrl: './star-promo-review.component.html'
})
export class StarPromoReviewComponent {
  @Input()
  logo: string;

  @Output()
  openModal = new EventEmitter<void>();
}
