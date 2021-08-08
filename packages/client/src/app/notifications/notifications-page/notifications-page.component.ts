import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { INotifications, ISortedNotifications, ENotificationType } from '@core/models';
import { NotificationDto } from '@danskill/contract';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'dsapp-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.scss']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  notifications: NotificationDto[] = [];

  sortedNotifications: ISortedNotifications[];

  today: Date = new Date();

  ENotificationType = ENotificationType;

  private unsubscribe = new Subject<void>();

  constructor(
    private notificationsService: NotificationsService,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  // TODO: DIV-228 we have to have a date in order to make a use out of it
  // sortNotifications(): void {
  //   const notificationGroups = this.notifications.reduce((groups, notification) => {
  //     const date = notification.createdAt.split('T')[0];
  //     if (!groups[date]) {
  //       groups[date] = [];
  //     }
  //     groups[date].push({
  //       userName: notification.performedActionUser[0].username,
  //       sourceUser: notification.sourceUser,
  //       performedActionUsername: notification.performedActionUsername,
  //       type: notification.type,
  //       createdAt: new Date(notification.createdAt),
  //       isRead: notification.isRead,
  //       _id: notification._id,
  //       link:
  //         notification.type === ENotificationType.NEW_STAR_FIGURE.split(' ').join('_')
  //           ? `../student/star/figures/${notification.linkedId}`
  //           : ''
  //     });
  //
  //     return groups;
  //   }, {});
  //
  //   this.sortedNotifications = Object.keys(notificationGroups)
  //     .map((date) => {
  //       return {
  //         date,
  //         notifications: notificationGroups[date]
  //       };
  //     })
  //     .sort((a, b) => {
  //       return (new Date(b.date) as any) - (new Date(a.date) as any);
  //     });
  // }

  getNotificationType(notification: INotifications): string {
    return ENotificationType[notification.type];
  }

  getNotifications(): void {
    this.notificationsService.getNotifications().subscribe((notifications: NotificationDto[]) => {
      this.notifications = notifications;
      // this.sortNotifications();
    });
  }

  setNotificationsAsRead(notification: NotificationDto): any {
    notification.isRead = true;
    // TODO: navigate to a particular page
    // this.router.navigate([notification.link]);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
