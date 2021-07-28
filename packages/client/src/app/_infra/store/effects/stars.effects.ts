import { Injectable } from '@angular/core';
import { StarsService } from '@core/services';
import { Actions } from '@ngrx/effects';

@Injectable()
export class StarsEffects {
  constructor(private action$: Actions, private starsService: StarsService) {}
}
