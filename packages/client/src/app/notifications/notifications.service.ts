import { Injectable } from '@angular/core';
import { INotifications, IRestResponse } from '@core/models';
import { map } from 'rxjs/operators';
import { BaseRestService } from '@core/services';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private baseRestService: BaseRestService) {}

  getNotifications(): Observable<INotifications[]> {
    return this.baseRestService.get<IRestResponse>(`notifications`).pipe(
      map((response: IRestResponse) => {
        return response.data ? response.data : [];
      })
    );
  }

  getUnreadNotificationsNumber(): Observable<number> {
    return this.baseRestService.get<IRestResponse>(`notifications`).pipe(
      map((response: IRestResponse) => {
        return response.data ? response.data : [];
      })
    );
  }
  // `stars/${starId}`

  setNotificationsAsRead(notificationId): Observable<any> {
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
