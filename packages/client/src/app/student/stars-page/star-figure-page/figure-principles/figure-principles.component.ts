import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap, Router , NavigationEnd} from '@angular/router';
import { Figure, LabItem, LabStarVideo, IStar, Video, VideoType, ETabs } from '@core/models';
import { from, Subscription } from 'rxjs';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as LabActions from '@store/actions/lab.actions';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';

@Component({
  selector: 'dsapp-figure-principles',
  templateUrl: './figure-principles.component.html',
  styleUrls: ['./figure-principles.component.scss']
})
export class FigurePrinciplesComponent implements OnInit {
  subs: Subscription[] = [];
  slug = null;
  figureId = null;
  prinicipals: any = null;
  star: IStar = null;
  figure: Figure = null;
  @Output() onVideoChanged = new EventEmitter<any>();

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFigureId();
    this.getFigure();
    this.getStar();
    this.getPrinicipals();
    this.changeVideo();
  }

  changeVideo(){
    this.onVideoChanged.emit(true);
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
    this.figureId = this.router.url.split('/')[this.router.url.split('/').length-2]
    this.slug = this.router.url.split('/')[this.router.url.split('/').length-3];
  }

  getPrinicipals(){
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureTabsById(this.figureId, 'basicPrinciples')).subscribe(
        videos => {
          if (videos) {
            this.prinicipals = videos ;
          } else {
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

  openInLab(starVideo: LabStarVideo): void {
    const labItem: LabItem = {
      star: this.star,
      figure: this.figure,
      starVideo
    }
    this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));

    this.router.navigate(['/', 'student', 'lab']);

  }
}
