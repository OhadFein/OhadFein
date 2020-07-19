import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarContentState } from '../state';

export const selectStarsContent = (state: StarContentState) => state.starsContent;

export const selectStarContentById = (id) => createSelector(
    selectStarsContent, (allStarsContent) => {
        if (!t(allStarsContent, 'starsContent').isNullOrUndefined) {
            return t(allStarsContent, 'starsContent').safeArray.find(content => content._id === id);
        }
        else {
            return null;
        }

    }
);

export const selectStarsContentError = () => createSelector(
    selectStarsContent, (result) => {
        if (result) {
            return t(result, 'error').safeObject;
        } else {
            return null;
        }
    }
);