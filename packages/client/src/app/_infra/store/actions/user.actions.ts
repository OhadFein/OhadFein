import {INotifications, User} from '@core/models';
import {createAction, props} from '@ngrx/store';

export enum UserActionType {
    GetUserAction = '[user] - Get user',
    BeginGetUserAction = '[user] - Begin Get user',
    SuccessGetUserAction = '[user] - Success Get user',
    ErrorGetUserAction = '[user] - Error Get user',
    UpdateUserAction = '[user] - Update user',
    BeginUpdateUserAction = '[user] - Begin Update user',
    SuccessUpdateUserAction = '[user] - Success Update user',
    ErrorUpdateUserAction = '[user] - Error Update user',
    ErrorUserAction = '[user] - Error',
    ClearUserAction = '[user] - Clear user',
    BeginGetGeneralInfoAction = '[user] - Begin Get GeneralInfo',
    SuccessGetGeneralInfoAction = '[user] - Success Get GeneralInfo',
    ErrorGetGeneralInfoAction = '[user] - Error Get GeneralInfo',
}


/// get

export const GetUserAction = createAction(UserActionType.GetUserAction);

export const BeginGetUserAction = createAction(UserActionType.BeginGetUserAction);

export const SuccessGetUserAction = createAction(
    UserActionType.SuccessGetUserAction,
    props<{ payload: User }>()
);

export const ErrorGetUserAction = createAction(
    UserActionType.ErrorGetUserAction,
    props<Error>()
);


// update
export const UpdateUserAction = createAction(UserActionType.UpdateUserAction);

export const BeginUpdateUserAction = createAction(
    UserActionType.BeginUpdateUserAction,
    props<{ payload: User }>()
);

export const SuccessUpdateUserAction = createAction(
    UserActionType.SuccessUpdateUserAction,
    props<{ payload: User }>()
);

export const ErrorUpdateUserAction = createAction(
    UserActionType.ErrorUpdateUserAction,
    props<Error>()
);

// Global error
export const ErrorUserAction = createAction(UserActionType.ErrorUserAction, props<Error>());

// Clear user data
export const ClearUserAction = createAction(UserActionType.ClearUserAction);

// export const GetUserAction = createAction(UserActionType.GetUserAction);

export const BeginGetGeneralInfoAction = createAction(UserActionType.BeginGetUserAction);

export const SuccessGetGeneralInfoAction = createAction(
    UserActionType.SuccessGetGeneralInfoAction,
    props<{ payload: INotifications[] }>()
);

export const ErrorGetGeneralInfoAction = createAction(
    UserActionType.ErrorGetGeneralInfoAction,
    props<Error>()
);