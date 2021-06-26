import { Practice } from '@core/models/';
import { createAction, props } from '@ngrx/store';

export enum PracticesActionType {
  GetPracticesAction = '[practices] - Get practices',
  BeginGetPracticesAction = '[practices] - Begin Get practices',
  SuccessGetPracticesAction = '[practices] - Success Get practices',
  updatePracticeItemAction = '[practices] - Update practice item',
  BeginUpdatePracticeItemAction = '[practices] - Begin update practice item',
  SuccessUpdatePracticeItemAction = '[practice] - Success update practice item',
  ErrorPracticesAction = '[practices] - Error',
  SaveCurrentMonth = '[practices] - Save current month',
  SuccesSaveCurrentMonth = '[practices] - Success save current month'
}

export const GetPracticesAction = createAction(
  PracticesActionType.GetPracticesAction
);

export const BeginGetPracticesAction = createAction(
  PracticesActionType.BeginGetPracticesAction
);

export const SuccessGetPracticesAction = createAction(
  PracticesActionType.SuccessGetPracticesAction,
  props<{ payload: Practice[] }>()
);

export const updatePracticeItemAction = createAction(
  PracticesActionType.updatePracticeItemAction
);

export const BeginUpdatePracticeItemAction = createAction(
  PracticesActionType.BeginUpdatePracticeItemAction,
  props<{ payload: Practice }>()
);

export const SuccessUpdatePracticeItemAction = createAction(
  PracticesActionType.SuccessUpdatePracticeItemAction,
  props<{ payload: Practice }>()
);

export const ErrorPracticesAction = createAction(
  PracticesActionType.ErrorPracticesAction,
  props<Error>()
);

export const SaveCurrentMonth = createAction(
  PracticesActionType.SaveCurrentMonth,
  props<{ payload: Date }>()
);

export const SuccessSaveCurrentMonth = createAction(
  PracticesActionType.SaveCurrentMonth,
  props<{ payload: string }>()
);
