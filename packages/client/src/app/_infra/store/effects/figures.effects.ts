import { Injectable } from '@angular/core';
import { IFigure } from '@core/models';
import { FiguresService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as FiguresActions from '../actions/figures.actions';

@Injectable()
export class FiguresEffects {
  constructor(
    private action$: Actions,
    private figuresService: FiguresService
  ) {}

  getFigure$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(FiguresActions.BeginGetFigureAction),
      mergeMap((action) =>
        this.figuresService.getFigure(action.payload).pipe(
          map((figure: IFigure) => {
            return FiguresActions.SuccessGetFigureAction({ payload: figure });
          }),
          catchError((error: Error) => {
            return of(FiguresActions.ErrorFiguresAction(error));
          })
        )
      )
    )
  );
}
