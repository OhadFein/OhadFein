import { createSelector } from '@ngrx/store';

import { LabState } from '../state';

export const selectLabItem = (state: LabState) => state.labItem;

export const selectCurrentLabItem = () =>
  createSelector(selectLabItem, (result) => {
    if (result) {
      return result['labItem'];
    }

    return null;
  });
