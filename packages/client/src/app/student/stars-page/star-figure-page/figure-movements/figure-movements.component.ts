import { Component, Input, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import { ActivatedRoute, ParamMap, Router , NavigationEnd} from '@angular/router';
import { Figure, LabItem, LabStarVideo, IStar, Video, VideoType, ETabs } from '@core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as LabActions from '@store/actions/lab.actions';

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
  movements: any = null;
  star: IStar = null;
  figure: Figure = null;

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) { 
    // console.log(7777);
  }

  ngOnInit(): void {
    this.getFigureId();
    this.getFigure();
    this.getStar();
    this.getMovements();
  }
  getFigure():void{
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = { ...figure };
          } else {
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

  getStar(): void{
    this.subs.push(
      this.store.select(StarSelectors.selectStarBySlug(this.slug)).subscribe(
        star => {
          if (star) {
            this.star = { ...star };
          } else {
            this.store.dispatch(StarsActions.BeginGetStarsAction());
          }
        })
    )
  }

  getFigureId() : void{
    console.log(this.router.url);
    this.figureId = this.router.url.split('/')[this.router.url.split('/').length-2]
    this.slug = this.router.url.split('/')[this.router.url.split('/').length-3];

  }

  getMovements(){
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureTabsById(this.figureId, 'comparable')).subscribe(
        videos => {
          if (videos) {
            this.movements = videos ;
          } else {
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

  openInLab(starVideo: LabStarVideo): void {
    console.log("open in lab")
    console.log('this.star :>> ', this.star);
    console.log('this.figure :>> ', this.figure);
    const labItem: LabItem = {
      star: this.star,
      figure: this.figure,
      starVideo
    }
    this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));

    this.router.navigate(['/', 'student', 'lab']);

  }
}
