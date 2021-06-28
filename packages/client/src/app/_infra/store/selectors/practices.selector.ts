import { createSelector } from '@ngrx/store';
import t from 'typy';

import { PracticesState } from '../state';

export const selectPractices = (state: PracticesState) => state.practices;

export const selectAllPracticesSorted = () =>
  createSelector(selectPractices, (allPractices) => {
    if (!t(allPractices, 'practices').isNullOrUndefined) {
      return t(allPractices, 'practices')
        .safeArray.slice()
        .sort((practice1) => (practice1.currentChallenge ? -1 : 1));
    }

    return null;
  });

export const selectAllPracticesByFigureId = (figureId) =>
  createSelector(selectPractices, (allPractices) => {
    if (!t(allPractices, 'practices').isNullOrUndefined) {
      return t(allPractices, 'practices').safeArray.filter(
        (practice) => practice.figure === figureId
      );
    }

    return null;
  });

export const selectPracticestMonth = () =>
  createSelector(selectPractices, (state: any) => {
    return state.currentMonth ? state.currentMonth : null;
  });

export const selectPracticeById = (id) =>
  createSelector(selectPractices, (allPractices) => {
    if (!t(allPractices, 'practices').isNullOrUndefined) {
      return t(allPractices, 'practices').safeArray.find((practice) => practice._id === id);
    }

    return null;
  });

export const selectPracticesError = () =>
  createSelector(selectPractices, (result) => {
    if (result) {
      return t(result, 'error').safeObject;
    }

    return null;
  });
