import { createSelector } from '@ngrx/store';
import t from 'typy';

import { NotificationsState } from '../state/notificationsState';

export const selectNotifications = (state: NotificationsState) => state.notifications;

export const selectAllNotifications = () => createSelector(
    selectNotifications, allNotifications => {
        return !t(allNotifications, 'notifications').isNullOrUndefined ? t(allNotifications, 'notifications').safeObject : null
    }
)

