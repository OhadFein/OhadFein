import { IStarContent } from '@core/models';

export class StarContentState {
  starsContent: Array<IStarContent> | null;
  error: Error | string | null; // track errors
}

export const initializeStarContentState = () => {
  return { starsContent: Array<IStarContent>(), error: null };
};
