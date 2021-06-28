import { Practice } from '@core/models/';

export class PracticesState {
  practices: Array<Practice> | null;
  currentMonth: Date;
  error: Error | string | null; // track errors
}

export const initializePracticesState = () => {
  return { practices: null, currentMonth: null, error: null };
};
