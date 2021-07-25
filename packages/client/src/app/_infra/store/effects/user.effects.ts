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
}
