import { Action, createReducer, on } from '@ngrx/store';

import * as StarsActions from '../actions/stars.actions';
import { initializeStarsState, StarsState } from '../state';


export const initialStarsState = initializeStarsState();

const reducer = createReducer(
    initialStarsState,
    on(StarsActions.GetStarsAction, state => state),

    on(StarsActions.SuccessGetStarsAction, (state: StarsState, { payload }) => {
        return { ...state, stars: payload };
    }),

    on(StarsActions.ErrorStarsAction, (state: StarsState, error: Error) => {
        console.log(error);
        return { ...state, starsError: error };
    })
);

export function StarsReducer(state: StarsState | undefined, action: Action) {
    return reducer(state, action);
}
