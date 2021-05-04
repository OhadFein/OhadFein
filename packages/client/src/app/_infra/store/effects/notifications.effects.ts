import { Injectable } from '@angular/core';
import {INotifications} from '@core/models';
import {NotificationsService} from '@app/notifications/notifications.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as NotificationsActions from '../actions/notifications.actions';


@Injectable()
export class NotificationsEffects {
    constructor(private action$: Actions, private notificationsService: NotificationsService) {
    }

    getNotifications$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(NotificationsActions.BeginGetNotificationsAction),
            mergeMap(action =>
                this.notificationsService.getNotifications().pipe(
                    map((notifications: INotifications[]) => {
                        console.log("notifications", notifications)
                        return NotificationsActions.SuccessGetNotificationsAction({ payload: notifications });
                    }),
                    catchError((error: Error) => {
                        return of(NotificationsActions.ErrorNotificationsAction(error));
                    })
                )
            )
        )
    );

    setNotificationsAsRead$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(NotificationsActions.BeginUpdateNotificationsAction),
            mergeMap(action =>
                this.notificationsService.setNotificationsAsRead(action.payload).pipe(
                    map((data: INotifications) => {
                        console.log("data",data)
                        return NotificationsActions.SuccessUpdateNotificationsAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(NotificationsActions.ErrorUpdateNotificationsAction(error));
                    })
                )
            )
        )
    );
}
