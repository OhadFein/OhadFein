import { createReducer, on } from '@ngrx/store';

import * as GlobalActions from '../actions/global.actions';
import { initializeGlobalState } from '../state';
import { GlobalActionTypes } from '../actions/global.actions';

export const initialGlobalState = initializeGlobalState();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reducer = createReducer(
  initialGlobalState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(GlobalActions.Logout, (state) => {
    return { ...initialGlobalState };
  })
);

// eslint-disable-next-line no-shadow
export function GlobalReducer(reducer) {
  return function (state, action) {
    if (action.type === GlobalActionTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
