import { Action, createReducer, on } from '@ngrx/store';
import * as StarsContentActions from '../actions/stars-content.actions';
import { initializeStarContentState, StarContentState } from '../state';

export const initialStarContentState = initializeStarContentState();

const reducer = createReducer(
    initialStarContentState,
    on(StarsContentActions.GetStarsContentAction, state => state),

    on(StarsContentActions.SuccessGetStarsContentAction, (state: StarContentState, { payload }) => {
        return { ...state, starsContent: [...state.starsContent, payload], error: null };
    }),

    on(StarsContentActions.ErrorStarsContentAction, (state: StarContentState, error: Error) => {
        return { ...state, error };
    })
);

export function StarsContentReducer(state: StarContentState | undefined, action: Action) {
    return reducer(state, action);
}
