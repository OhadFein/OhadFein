import { Action, createReducer, on } from '@ngrx/store';

import * as FiguresActions from '../actions/figures.actions';
import { FiguresState, initializeFiguresState } from '../state';

export const initialFiguresState = initializeFiguresState();

const reducer = createReducer(
  initialFiguresState,
  on(FiguresActions.GetFiguresAction, (state) => state),

  on(FiguresActions.SuccessGetFigureAction, (state: FiguresState, { payload }) => {
    return { ...state, figures: [...state.figures, payload], error: null };
  }),

  on(FiguresActions.ErrorFiguresAction, (state: FiguresState, error: Error) => {
    return { ...state, error };
  })
);

export function FiguresReducer(state: FiguresState | undefined, action: Action) {
  return reducer(state, action);
}
