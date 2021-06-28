import { IFigure } from '@core/models';
import { createAction, props } from '@ngrx/store';

export enum FiguresActionType {
  GetFiguresAction = '[figures] - Get figures',
  BeginGetFigureAction = '[figures] - Begin Get figures',
  SuccessGetFigureAction = '[figures] - Success Get figures',
  ErrorFigureAction = '[figure] - Error'
}

export const GetFiguresAction = createAction(FiguresActionType.GetFiguresAction);

export const BeginGetFigureAction = createAction(
  FiguresActionType.BeginGetFigureAction,
  props<{ payload: string }>()
);

export const SuccessGetFigureAction = createAction(
  FiguresActionType.SuccessGetFigureAction,
  props<{ payload: IFigure }>()
);

export const ErrorFiguresAction = createAction(FiguresActionType.ErrorFigureAction, props<Error>());
