import { StarContent } from '@core/models';
import { createAction, props } from '@ngrx/store';

export enum StarsContentActionType {
    GetStarsContentAction = '[starsContent] - Get starsContent',
    BeginGetStarsContentAction = '[starsContent] - Begin Get starsContent',
    SuccessGetStarsContentAction = '[starsContent] - Success Get starsContent',
    ErrorStarsContentAction = '[starsContent] - Error'
}

export const GetStarsContentAction = createAction(StarsContentActionType.GetStarsContentAction);

export const BeginGetStarsContentAction = createAction(StarsContentActionType.BeginGetStarsContentAction);

export const SuccessGetStarsContentAction = createAction(
    StarsContentActionType.SuccessGetStarsContentAction,
    props<{ payload: StarContent[] }>()
);

export const ErrorStarsContentAction = createAction(StarsContentActionType.ErrorStarsContentAction, props<Error>());