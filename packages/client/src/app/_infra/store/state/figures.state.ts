import { IFigure } from '@core/models/';

export class FiguresState {
  figures: Array<IFigure> | null;
  error: Error | string | null; // track errors
}

export const initializeFiguresState = () => {
  return {figures: Array<IFigure>(), error: null};
};
