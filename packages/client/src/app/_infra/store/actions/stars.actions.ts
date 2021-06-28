import { IUser } from '@core/models';
import { createAction, props } from '@ngrx/store';

export enum StarsActionType {
  GetStarsAction = '[stars] - Get stars',
  BeginGetStarsAction = '[stars] - Begin Get stars',
  SuccessGetStarsAction = '[stars] - Success Get stars',
  ErrorStarsAction = '[stars] - Error'
}

export const GetStarsAction = createAction(StarsActionType.GetStarsAction);

export const BeginGetStarsAction = createAction(StarsActionType.BeginGetStarsAction);

export const SuccessGetStarsAction = createAction(
  StarsActionType.SuccessGetStarsAction,
  props<{ payload: IUser[] }>()
);

export const ErrorStarsAction = createAction(StarsActionType.ErrorStarsAction, props<Error>());
