import { createSelector } from '@ngrx/store';
import t from 'typy';

import { PracticesState } from '../state';
import { Practice } from '@app/_infra/core/models';

export const selectPractices = (state: PracticesState) => state.practices;

export const selectAllPracticesSorted = () => createSelector(
    selectPractices, (allPractices) => {
        if (!t(allPractices, 'practices').isNullOrUndefined) {
            return t(allPractices, 'practices').safeArray.slice().sort((practice1, practice2) => practice1.currentChallenge ? -1 : 1);
        } else {
            return null;
        }
    }
)



export const selectPracticeById = (id) => createSelector(
    selectPractices, (allPractices) => {
        if (!t(allPractices, 'practices').isNullOrUndefined) {
            return t(allPractices, 'practices').safeArray.find(practice => practice.id === +id);
        } else {
            return null;
        }
    }
);

export const selectPracticesError = () => createSelector(
    selectPractices, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);
