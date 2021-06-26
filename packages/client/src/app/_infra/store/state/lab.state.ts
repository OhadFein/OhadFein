import { LabItem } from '@core/models/';

export class LabState {
  labItem: LabItem | null;
  error: Error | string | null; // track errors
}

export const initializeLabState = () => {
  return { labItem: null, error: null };
};
