import { Action, createReducer, on } from '@ngrx/store';
import * as NotificationsActions from '../actions/notifications.actions';
import { initializeNotificationsState, NotificationsState } from '../state';

export const initialNotificationsState = initializeNotificationsState();

const reducer = createReducer(
  initialNotificationsState,
  on(NotificationsActions.GetNotificationsAction, (state) => state)
);

export function NotificationsReducer(state: NotificationsState | undefined, action: Action) {
  return reducer(state, action);
}
