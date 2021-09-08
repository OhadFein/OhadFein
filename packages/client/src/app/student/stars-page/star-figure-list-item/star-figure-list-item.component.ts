import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsapp-star-figure-list-item',
  templateUrl: './star-figure-list-item.component.html',
  styleUrls: ['./star-figure-list-item.component.scss']
})
export class StarFigureListItemComponent {
  @Input()
  logo: string;

  @Input()
  name: string;
}
