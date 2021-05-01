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
      groups[date].push(notification);
      return groups;
    }, {});

    this.sortedNotifications = Object.keys(groups).map((date) => {
      return {
        date,
        notifications: groups[date]
      };
    });
    console.log("this.sortedNotifications", this.sortedNotifications)
  }

  getNotifications(): void{
    this.notifications =  this.notificationsService.getNotifications();
  }

  setNotifications(): any{
    this.notificationsService.setNotifications()
  }

}
