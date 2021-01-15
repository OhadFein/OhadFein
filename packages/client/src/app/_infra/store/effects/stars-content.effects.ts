import { Injectable } from '@angular/core';
import { DanceType, Figure, IStarContent, StarContentDance, StarDanceLevel } from '@core/models';
import { FiguresService, StarsService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as StarsContentActions from '../actions/stars-content.actions';


@Injectable()
export class StarsContentEffects {
    constructor(private action$: Actions, private starsService: StarsService) { }

    getStarContent$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(StarsContentActions.BeginGetStarsContentAction),
            mergeMap(action =>
                this.starsService.getStarContent(action.payload).pipe(
                    map((starContent: IStarContent) => {
                        return StarsContentActions.SuccessGetStarsContentAction({ payload: starContent });
                    }),
                    catchError((error: Error) => {
                        return of(StarsContentActions.ErrorStarsContentAction(error));
                    })
                )
            )
        )
    );
}
