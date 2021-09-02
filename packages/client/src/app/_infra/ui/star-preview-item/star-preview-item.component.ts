import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsapp-star-preview-item',
  templateUrl: './star-preview-item.component.html',
  styleUrls: ['./star-preview-item.component.scss']
})
export class StarPreviewItemComponent {
  @Input()
  logo: string;

  @Input()
  name: string;
}
