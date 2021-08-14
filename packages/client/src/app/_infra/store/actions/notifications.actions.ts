import { createAction, props } from '@ngrx/store';
import { NotificationDto } from '@danskill/contract';

export enum NotificationsActionType {
  GetNotificationsAction = '[notifications] - Get notifications',
  BeginGetNotificationsAction = '[notifications] - Begin Get notifications',
  SuccessGetNotificationsAction = '[notifications] - Success Get notifications',
  ErrorNotificationsAction = '[notifications] - Error',
  BeginUpdateNotificationsAction = '[notifications] - Begin Update notifications',
  SuccessUpdateNotificationsAction = '[notifications] - Success Update notifications',
  ErrorUpdateNotificationsAction = '[notifications] - Error Update notifications'
}

export const GetNotificationsAction = createAction(NotificationsActionType.GetNotificationsAction);

export const BeginGetNotificationsAction = createAction(
  NotificationsActionType.BeginGetNotificationsAction
);

export const SuccessGetNotificationsAction = createAction(
  NotificationsActionType.SuccessGetNotificationsAction,
  props<{ payload: NotificationDto[] }>()
);

export const ErrorNotificationsAction = createAction(
  NotificationsActionType.ErrorNotificationsAction,
  props<Error>()
);

export const BeginUpdateNotificationsAction = createAction(
  NotificationsActionType.BeginUpdateNotificationsAction,
  props<{ payload: string }>()
);

export const SuccessUpdateNotificationsAction = createAction(
  NotificationsActionType.SuccessUpdateNotificationsAction,
  props<{ payload: any }>()
);

export const ErrorUpdateNotificationsAction = createAction(
  NotificationsActionType.ErrorUpdateNotificationsAction,
  props<Error>()
);
