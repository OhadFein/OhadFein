import { INotifications } from '@core/models/';

export class NotificationsState {
  notifications: Array<INotifications> | null;
  error: Error | string | null; // track errors
}

export const initializeNotificationsState = () => {
  return { notifications: null, error: null };
};
