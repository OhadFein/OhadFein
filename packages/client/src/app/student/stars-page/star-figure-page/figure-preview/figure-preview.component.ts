import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Figure, IUser } from '@core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';

@Component({
  selector: 'dsapp-figure-preview',
  templateUrl: './figure-preview.component.html',
  styles: [
  ]
})
export class FigurePreviewComponent implements OnInit {

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) { }

  subs: Subscription[] = [];
  slug = null;
  figureId = null;
  movements: any = null;
  star: IUser = null;
  figure: Figure = null;
  levels = ['beginners', 'intermediate', 'advanced']

  ngOnInit(): void {
    this.getFigureId();
    this.getFigure();
  }

  getLevelStr(): string {
    return this.levels[Number(this.figure.level) -1]
  }

  getFigure(): void {
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = figure;
          } else {
            this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId }));
          }
        })
    )
  }

  getFigureId(): void {
    const splittedPath = location.pathname.split('/');
    
    this.slug = splittedPath[3];
    this.figureId = splittedPath[4];
  }
}
