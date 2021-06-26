import { createAction } from '@ngrx/store';

export enum GlobalActionTypes {
    LOGOUT = '[App] logout'
}

export const Logout = createAction(GlobalActionTypes.LOGOUT);
