import { Component, Input } from '@angular/core';
import { StarDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-star-preview-item',
  templateUrl: './star-preview-item.component.html',
  styleUrls: ['./star-preview-item.component.scss']
})
export class StarPreviewItemComponent {
  @Input() star: StarDto;
}
