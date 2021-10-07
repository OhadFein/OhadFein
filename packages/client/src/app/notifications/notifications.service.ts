import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, count, flatMap } from 'rxjs/operators';

import { BaseRestService } from '@core/services';
import { NotificationDto } from '@danskill/contract';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private baseRestService: BaseRestService) {}

  private unreadNotificationsNumSubject = new Subject<number>();

  public unreadNotificationsNumObservable = this.unreadNotificationsNumSubject.asObservable();

  getNotifications(): Observable<NotificationDto[]> {
    return this.baseRestService.get<NotificationDto[]>(`notifications`);
  }

  getUnreadNotificationsNumber(): Observable<number> {
    return this.getNotifications().pipe(
      flatMap((notifications) => notifications),
      count((notification) => !notification.isRead)
    );
  }

  setNotificationsAsRead(notificationId: string): void {
    this.baseRestService
      .post<any>(`notifications/markRead/${notificationId}`, {})
      .toPromise()
      .then(() => {
        this.getUnreadNotificationsNumber()
          .pipe(map((value) => this.unreadNotificationsNumSubject.next(value)))
          .subscribe();
      });
  }
}
