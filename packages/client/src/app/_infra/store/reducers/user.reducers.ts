import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '../actions/user.actions';
import { UserState } from '../state';



export const initialState = { user: null, error: null, notifictions: null };

const reducer = createReducer(
  initialState,
  on(UserActions.GetUserAction, state => state),

  on(UserActions.SuccessGetUserAction, (state: UserState, { payload }) => {
    return { ...state, user: payload, error: null };
  }),

  on(UserActions.ErrorGetUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  }),

  on(UserActions.UpdateUserAction, state => state),

  on(UserActions.SuccessUpdateUserAction, (state: UserState, { payload }) => {
    return { ...state, user: payload, error: null };
  }),

  on(UserActions.ErrorUpdateUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  }),

  on(UserActions.ErrorUserAction, (state: UserState, error: Error) => {
    console.error(error);
    return { ...state, error };
  }),

  on(UserActions.ClearUserAction, state => {
    return { user: null, error: null };
  }),

    // on(UserActions.SuccessGetGeneralInfoAction, (state: UserState, { payload }) => {
    //   return { ...state, notifications: payload, error: null };
    // }),
);


export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
