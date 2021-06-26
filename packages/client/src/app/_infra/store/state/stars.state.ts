import { IUser } from '@core/models';

export class StarsState {
  stars: Array<IUser> | null;
  error: Error | string | null; // track errors
}

export const initializeStarsState = () => {
  return { stars: null, error: null };
};
