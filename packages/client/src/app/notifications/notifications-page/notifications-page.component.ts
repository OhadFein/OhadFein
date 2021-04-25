import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {INotifications} from '@core/models';

@Component({
  selector: 'dsapp-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.scss']
})
export class NotificationsPageComponent implements OnInit {

  public notifications: INotifications[]= [];
  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getNotifications();
    console.log("this.notifications", this.notifications)
  }

  getNotifications(): void{
    this.notifications =  this.notificationsService.getNotifications();
  }

  setNotifications(): any{
    this.notificationsService.setNotifications()
  }

}
