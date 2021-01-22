import { Component, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Figure, LabItem, LabStarVideo, IStar, Video, VideoType, ETabs } from '@core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';

@Component({
  selector: 'dsapp-figure-movements',
  templateUrl: './figure-movements.component.html',
  styles: [
  ]
})
export class FigureMovementsComponent implements OnInit {

  subs: Subscription[] = [];
  slug = null;
  figureId = null;
  figure: Figure = null;

  constructor(    private store: Store<any>,    private router: Router,    private route: ActivatedRoute,


    ) { }

  ngOnInit(): void {
    console.log(5555555)
    this.subs.push(
      this.route.params.subscribe((params: ParamMap) => {
        this.slug = params['slug'];
        this.figureId = params['figureId'];
        console.log("this.figureId", this.figureId)
      })
    )
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = { ...figure };
            console.log("figure", figure)
            // this.splitVideosByType();
            // this.starIsLoading = false;
          } else {
            console.log(66666)
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

}
