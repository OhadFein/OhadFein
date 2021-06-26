import { createSelector } from '@ngrx/store';
import t from 'typy';

import { FiguresState } from '../state';

export const selectFigures = (state: FiguresState) => state.figures;

export const selectFigureById = (figureId) =>
  createSelector(selectFigures, (allFigures) => {
    if (!t(allFigures, 'figures').isNullOrUndefined) {
      return t(allFigures, 'figures').safeArray.find(
        (figure) => figure._id === figureId
      );
    }

    return null;
  });

export const selectFigureTabsById = (figureId, tab) =>
  createSelector(selectFigures, (allFigures) => {
    if (!t(allFigures, 'figures').isNullOrUndefined) {
      const figures = t(allFigures, 'figures').safeArray.find(
        (figure) => figure._id === figureId
      );
      if (!t(figures, 'videos').isNullOrUndefined) {
        return t(figures, 'videos').safeArray.filter(
          (video) => video.type === tab
        );
      }
    } else {
      return null;
    }
  });

export const selectFiguresError = () =>
  createSelector(selectFigures, (result) => {
    if (result) {
      return t(result, 'error').safeObject;
    }

    return null;
  });
