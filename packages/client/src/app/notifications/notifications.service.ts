import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseRestService } from '@core/services';
import { NotificationDto } from '@danskill/contract';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private baseRestService: BaseRestService) {}

  getNotifications(): Observable<NotificationDto[]> {
    return this.baseRestService.get<NotificationDto[]>(`notifications`);
  }

  setNotificationsAsRead(notificationId: string): Observable<any> {
    return this.baseRestService.post<any>(`notifications/mark/read/${notificationId}`, {}).pipe(
      map(
        (res) => {
          if (res.success) {
            return res.data;
          }
          throwError([res.message]); // TODO: add real error here
        },
        () => {
          throwError(['ERRORS.GeneralBackendError']);
        }
      )
    );
  }
}
