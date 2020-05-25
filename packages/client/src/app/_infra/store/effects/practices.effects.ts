import { Injectable } from '@angular/core';
import { Star, Practice } from '@core/models';
import { PracticesService } from '@core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as PracticsActions from '../actions/practices.actions';

@Injectable()
export class PracticesEffects {
    constructor(private action$: Actions, private practicesService: PracticesService) {
     }

    getPractices$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(PracticsActions.BeginGetPracticesAction),
            mergeMap(action =>
                this.practicesService.getPractices().pipe(
                    map((data: Practice[]) => {
                        return PracticsActions.SuccessGetPracticesAction({ payload: data });
                    }),
                    catchError((error: Error) => {
                        return of(PracticsActions.ErrorPracticesAction(error));
                    })
                )
            )
        )
    );
}
