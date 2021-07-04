import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';

@Injectable({
  providedIn: 'root'
})
export class StarFigureService {
  constructor(private store: Store<any>) {}

  getFigure(figureId): any {
    this.store.select(FigureSelectors.selectFigureById(figureId)).subscribe((figure) => {
      if (figure) {
        return figure;
      }
      setTimeout(() => {
        this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: figureId }));
      }, 1000);
    });
  }
}
