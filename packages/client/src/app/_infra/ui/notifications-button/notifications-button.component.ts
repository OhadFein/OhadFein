import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss']
})
export class NotificationButtonComponent implements OnInit {
  unreadNotificationsNumber: number;

  ngOnInit(): void {
    this.unreadNotificationsNumber = this.getUnreadNotificationsNumber();
  }

  private getUnreadNotificationsNumber(): number {
    // TODO decide where do I get it?
    return 1;
  }
}
