import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StarDanceLevel } from '@app/_infra/core/models';

@Component({
  selector: 'dsapp-levels-tabs',
  templateUrl: './levels-tabs.component.html'
})
export class LevelsTabsComponent implements OnChanges {

  @Input() levels: Array<StarDanceLevel>

  active = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.levels && changes.levels.currentValue.length > 0) {
    //   this.active = changes.levels.currentValue[0].level;
    // }
  }

}
