import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import { switchMap } from 'rxjs/operators'
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import { Figure} from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class StarFigureService {

  constructor(private store: Store<any>) { }

  getFigure(figureId): any {
  this.store.select(FigureSelectors.selectFigureById(figureId)).subscribe(
    figure => {
      if (figure) {
          return figure; 
      } else {
        setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: figureId })); }, 1000);
      }
    })
  
  }

}
