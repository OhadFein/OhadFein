import { Injectable } from '@angular/core';
import { Practice } from '@core/models';
import { PracticesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PracticsActions from '../actions/practices.actions';

@Injectable()
export class PracticesEffects {
  constructor(private action$: Actions, private practicesService: PracticesService) {}

  updatePracticeItem$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(PracticsActions.BeginUpdatePracticeItemAction),
      mergeMap((action) =>
        this.practicesService.updatePractice(action.payload).pipe(
          map((data: Practice) => {
            return PracticsActions.SuccessUpdatePracticeItemAction({
              payload: data
            });
          }),
          catchError((error: Error) => {
            return of(PracticsActions.ErrorPracticesAction(error));
          })
        )
      )
    )
  );
}
