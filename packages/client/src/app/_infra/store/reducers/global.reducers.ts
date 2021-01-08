import { ActionReducer, createReducer, on } from '@ngrx/store';

import * as GlobalActions from '../actions/global.actions';
import { initializeGlobalState } from '../state';
import {GlobalActionTypes} from "../actions/global.actions";

export const initialGlobalState = initializeGlobalState();

const reducer = createReducer(
    initialGlobalState,
    on(GlobalActions.Logout, state => {
        return { ...initialGlobalState };
    })
);

export function GlobalReducer(reducer) {
    return function (state, action) {
        if (action.type === GlobalActionTypes.LOGOUT) {
            state = undefined;
        }
        return reducer(state, action);
    };
}

