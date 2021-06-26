import { Injectable } from '@angular/core';
import { INotifications, User } from '@app/_infra/core/models';
import { UserService } from '@infra/core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  getUser$: Observable<Action> = createEffect(() =>
	this.action$.pipe(
	  ofType(UserActions.BeginGetUserAction),
	  mergeMap(action =>
		this.userService.getUser().pipe(
		  map((data: User) => {
			return UserActions.SuccessGetUserAction({payload: data});
		  }),
		  catchError((error: Error) => {
			return of(UserActions.ErrorGetUserAction(error));
		  })
		)
	  )
	)
  );

  updateUser$: Observable<Action> = createEffect(() =>
	this.action$.pipe(
	  ofType(UserActions.BeginUpdateUserAction),
	  mergeMap(action =>
		this.userService.updateUser(action.payload).pipe(
		  map((data: User) => {
			return UserActions.SuccessUpdateUserAction({payload: data});
		  }),
		  catchError((error: Error) => {
			return of(UserActions.ErrorUpdateUserAction(error));
		  })
		)
	  )
	)
  );

  getGeneralInfo$: Observable<Action> = createEffect(() =>
	this.action$.pipe(
	  ofType(UserActions.BeginGetGeneralInfoAction),
	  mergeMap(action =>
		this.userService.getGeneralInfo().pipe(
		  map((data: INotifications[]) => {
			return UserActions.SuccessGetGeneralInfoAction({payload: data});
		  }),
		  catchError((error: Error) => {
			return of(UserActions.ErrorGetGeneralInfoAction(error));
		  })
		)
	  )
	)
  );
}
