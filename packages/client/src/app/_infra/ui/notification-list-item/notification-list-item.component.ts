import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-notification-list-item',
  templateUrl: './notification-list-item.component.html',
  styleUrls: ['./notification-list-item.component.scss']
})
export class NotificationListItemComponent {
  @Input()
  notification: NotificationDto;

  @Output()
  readNotification = new EventEmitter<void>();

  MESSAGE_PLACEHOLDER = 'Your coach left a note on your Close basic movement video.';

  TIME_PLACEHOLDER = Date.now();

  onReadNotification(): void {
    this.readNotification.emit();
  }
}
