import { createSelector } from '@ngrx/store';
import { UserState } from '../state';
import t from 'typy';


export const selectUser = (state: UserState) => state.user;

export const selectCurrentUser = () => createSelector(
    selectUser, (result) => {
        if (result) {
            return result['user'];
        } else {
            return null;
        }
    }
);

export const selectGeneralInfo = () => createSelector(
    selectGeneralInfo, (result) => {
        console.log("result", result)
        if (result) {
            return result['error'];
        } else {
            return null;
        }
    }
);

export const selectCurrentUserError = () => createSelector(
    selectUser, (result) => {
        if (result) {
            return result['error'];
        } else {
            return null;
        }
    }
);

