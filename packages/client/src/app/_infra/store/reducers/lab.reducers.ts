import { Action, createReducer, on } from '@ngrx/store';

import * as LabActions from '../actions/lab.actions';
import { initializeLabState, LabState } from '../state';

export const initialLabState = initializeLabState();

const reducer = createReducer(
  initialLabState,
  on(LabActions.GetLabAction, (state) => state),

  on(LabActions.SetLabAction, (state: LabState, { payload }) => {
    return { ...state, labItem: payload, error: null };
  }),

  on(LabActions.UpdateLabAction, (state: LabState, { payload }) => {
    return { ...state, labItem: payload, error: null };
  }),

  on(LabActions.ClearLabAction, () => {
    return { labItem: null, error: null };
  })
);

export function LabReducer(state: LabState | undefined, action: Action) {
  return reducer(state, action);
}
