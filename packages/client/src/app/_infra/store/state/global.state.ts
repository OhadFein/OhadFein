import { FiguresState } from './figures.state';
import { LabState } from './lab.state';
import { PracticesState } from './practices.state';
import { StarContentState } from './star-content-state';
import { StarsState } from './stars.state';
import { UserState } from './user.state';

export class GlobalState {
  user: UserState | undefined;
  stars: StarsState | undefined;
  starsContent: StarContentState | undefined;
  practices: PracticesState | undefined;
  labItem: LabState | undefined;
  figures: FiguresState | undefined;
}

export const initializeGlobalState = () => {
  return {
    user: undefined,
    stars: undefined,
    starsContent: undefined,
    practices: undefined,
    labItem: undefined,
    figures: undefined
  };
};
