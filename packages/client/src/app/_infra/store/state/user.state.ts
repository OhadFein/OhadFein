import { INotifications, User } from '@core/models';

export class UserState {
  user: User | null;
  notifications: INotifications[];
  error: Error | string | null; // track errors
}

export const initializeUserState = () => {
  return { user: null, notifications: null, error: null };
};
