import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FigureBaseDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-horizontal-preview-carousel',
  templateUrl: './horizontal-preview-carousel.component.html',
  styleUrls: ['./horizontal-preview-carousel.component.scss']
})
export class HorizontalPreviewCarouselComponent {
  @Input()
  name: string;

  @Input()
  items: FigureBaseDto[];

  @Output()
  viewAll = new EventEmitter<string>();
}
