import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {INotifications, ISortedNotifications} from '@core/models';

@Component({
  selector: 'dsapp-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.scss']
})
export class NotificationsPageComponent implements OnInit {

  public notifications: INotifications[]= [];
  public sortedNotifications: ISortedNotifications[];
  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getNotifications();
    this.sortNotifications();
  }

  sortNotifications(): void{
    const groups = this.notifications.reduce((groups, notification) => {
      const date = notification.createdAt.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push({sourceUsername: notification.sourceUsername,
        performedActionUsername: notification.performedActionUsername,
        type: notification.type,
        createdAt: new Date(notification.createdAt),
        isRead: notification.isRead
      });
      return groups;
    }, {});

    this.sortedNotifications = Object.keys(groups).map((date) => {
      return {
        date,
        notifications: groups[date]
      };
    }).sort((a, b) => {
      return new Date(b.date) as any - new Date(a.date) as any;
    });
  }

  getNotifications(): void{
    this.notifications =  this.notificationsService.getNotifications();
  }

  setNotifications(): any{
    this.notificationsService.setNotifications()
  }

}
