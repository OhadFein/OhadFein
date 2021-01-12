import { createSelector } from '@ngrx/store';
import t from 'typy';

import { StarContentState } from '../state';

export const selectStarsContent = (state: StarContentState) => state.starsContent;

export const selectStarContentByStarId = (starId) => createSelector(
    selectStarsContent, (allStarsContent) => {
        console.log("allStarsContent", allStarsContent)
        if (!t(allStarsContent, 'starsContent').isNullOrUndefined) {
            t(allStarsContent, 'starsContent[0]').safeArray.forEach((item)=>{
                console.log("item", item)
                // console.log("item", item.stars[0] === starId)
                // if(item._id === starId)
                // console.log(9999)
                console.log("content.stars[0]", item.stars[0])
            })
            return t(allStarsContent, 'starsContent[0]').safeArray.find(content => content.stars[0] === starId);
        }
        else {
            console.log(2222)
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