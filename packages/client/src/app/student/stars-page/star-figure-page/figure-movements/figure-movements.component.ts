import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { IFigure, LabItem, LabStarVideo, IUser } from '@core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as LabActions from '@store/actions/lab.actions';
import { SharedService } from '@app/_infra/core/services/shared.service';

@Component({
  selector: 'dsapp-figure-movements',
  templateUrl: './figure-movements.component.html',
  styleUrls: ['./figure-movements.component.scss']
})
export class FigureMovementsComponent implements OnInit {
  subs: Subscription[] = [];
  slug = null;
  figureId = null;
  movements: any = null;
  star: IUser = null;
  figure: IFigure = null;
  currentVideoId: string = null;
  @Output() onVideoSelected = new EventEmitter<any>();

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getFigureId();
    this.getFigure();
    this.getStar();
    this.getMovements();
  }

  onVideoSelectedEvent(video) {
    this.currentVideoId = video._id;
    this.sharedService.emitChange(video);
  }

  getFigure(): void {
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe((figure) => {
        if (figure) {
          this.figure = { ...figure };
        } else {
          setTimeout(() => {
            this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId }));
          }, 1000);
        }
      })
    );
  }

  getStar(): void {
    this.subs.push(
      this.store.select(StarSelectors.selectStarBySlug(this.slug)).subscribe((star) => {
        if (star) {
          this.star = { ...star };
        } else {
          this.store.dispatch(StarsActions.BeginGetStarsAction());
        }
      })
    );
  }

  getFigureId(): void {
    const splittedPath = location.pathname.split('/');

    this.slug = splittedPath[3];
    this.figureId = splittedPath[4];
  }

  getMovements() {
    this.subs.push(
      this.store
        .select(FigureSelectors.selectFigureTabsById(this.figureId, 'comparable'))
        .subscribe((videos) => {
          if (videos) {
            this.movements = videos;
            this.currentVideoId = videos[0]._id;
          } else {
            setTimeout(() => {
              this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId }));
            }, 1000);
          }
        })
    );
  }

  openInLab(starVideo: LabStarVideo): void {
    const labItem: LabItem = {
      user: this.star,
      figure: this.figure,
      starVideo
    };
    this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));

    this.router.navigate(['/', 'student', 'lab']);
  }
}
