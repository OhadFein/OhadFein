import { Injectable } from '@angular/core';
import { DanceType, Figure, StarContent, StarContentDance, StarDanceLevel } from '@core/models';
import { FiguresService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as StarsContentActions from '../actions/stars-content.actions';


@Injectable()
export class StarsContentEffects {
    constructor(private action$: Actions, private figuresService: FiguresService) { }

    getStarContent$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(StarsContentActions.BeginGetStarsContentAction),
            mergeMap(action =>
                this.figuresService.getStarFigures(action.payload).pipe(
                    map((figures: Figure[]) => {
                        console.log("figures", figures.length)
                        return StarsContentActions.SuccessGetStarsContentAction({ payload: figures });
                    }),
                    catchError((error: Error) => {
                        return of(StarsContentActions.ErrorStarsContentAction(error));
                    })
                )
            )
        )
    );
}
