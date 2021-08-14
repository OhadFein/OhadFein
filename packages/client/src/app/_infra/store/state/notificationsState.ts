import { NotificationDto } from '@danskill/contract';

export class NotificationsState {
  notifications: NotificationDto[] | null;
}

export const initializeNotificationsState = () => {
  return { notifications: null };
};
