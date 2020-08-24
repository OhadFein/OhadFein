import { LabItem } from '@core/models/';
import { createAction, props } from '@ngrx/store';

export enum LabActionType {
    GetLabAction = '[labItem] - Get labItem',
    SetLabAction = '[labItem] - Set labItem',
    ClearLabAction = '[labItem] - Clear labItem'
}

export const GetLabAction = createAction(LabActionType.GetLabAction);

export const SetLabAction = createAction(
    LabActionType.SetLabAction,
    props<{ payload: LabItem }>()
);

export const ClearLabAction = createAction(LabActionType.ClearLabAction);