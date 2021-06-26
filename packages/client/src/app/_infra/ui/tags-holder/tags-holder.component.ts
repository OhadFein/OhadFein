import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Tag } from '@core/models';

@Component({
  selector: 'dsapp-tags-holder',
  templateUrl: './tags-holder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsHolderComponent implements OnInit {
  @Input() tags: Array<Tag> = [];

  constructor() {}

  ngOnInit() {}
}
