import {INotifications, IUser} from '@core/models/';
import { createAction, props } from '@ngrx/store';

export enum NotificationsActionType {
    GetNotificationsAction = '[notifications] - Get notifications',
    BeginGetNotificationsAction = '[notifications] - Begin Get notifications',
    SuccessGetNotificationsAction = '[notifications] - Success Get notifications',
    ErrorNotificationsAction = '[notifications] - Error'
}


export const GetNotificationsAction = createAction(NotificationsActionType.GetNotificationsAction);

export const BeginGetNotificationsAction = createAction(NotificationsActionType.BeginGetNotificationsAction);

export const SuccessGetNotificationsAction = createAction(
    NotificationsActionType.SuccessGetNotificationsAction,
    props<{ payload: INotifications[] }>()
);

export const ErrorNotificationsAction = createAction(NotificationsActionType.ErrorNotificationsAction, props<Error>());
