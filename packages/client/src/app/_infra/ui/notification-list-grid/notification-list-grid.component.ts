import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-notification-list-grid',
  templateUrl: './notification-list-grid.component.html',
  styleUrls: ['./notification-list-grid.component.scss']
})
export class NotificationListGridComponent {
  @Input()
  notifications: NotificationDto[];

  @Output()
  readNotification = new EventEmitter<NotificationDto>();

  onReadNotification(index: number): void {
    this.readNotification.emit(this.notifications[index]);
  }
}
