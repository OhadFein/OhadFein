import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IUser } from '@core/models';

@Component({
  selector: 'dsapp-star-info',
  templateUrl: './star-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarInfoComponent implements OnInit {
  @Input() user: IUser;

  description: string;

  ngOnInit() {
    this.description = this.user?.star?.description;
  }
}
