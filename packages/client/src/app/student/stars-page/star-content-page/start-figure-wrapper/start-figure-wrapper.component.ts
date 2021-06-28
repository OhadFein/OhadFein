import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import * as selectors from '@infra/store/selectors/stars-content.selectors';
import * as StarContentActions from '@app/_infra/store/actions/stars-content.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFigure } from '@app/_infra/core/models';
import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper/core';

SwiperCore.use([Pagination, Scrollbar, A11y]);

@Component({
  selector: 'dsapp-start-figure-wrapper',
  templateUrl: './start-figure-wrapper.component.html'
})
export class StartFigureWrapperComponent implements OnInit, AfterViewInit {
  subs: Subscription[] = [];
  star: any;
  content: any;
  selectDance: any[];
  loading: boolean;
  figures: IFigure[];
  danceTypes: string[];
  figuresPerType: IFigure[];
  @Input() starId: string;

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getStarContent();
  }

  manageTypes() {
    this.danceTypes = [...new Set(this.figures.map((item) => item.type))];
  }

  getFiguresPerDance(dance): IFigure[] {
    return (this.figuresPerType = this.figures.filter((figure) => figure.type === dance));
  }

  getStarContent() {
    this.subs.push(
      this.store.select(selectors.selectStarContentByStarId(this.starId)).subscribe((content) => {
        if (content) {
          this.content = { ...content };
          this.figures = this.content.figures;
          this.manageTypes();
          // this.getFiguresPerDance('samba');
          this.loading = false;
        } else {
          this.store.dispatch(
            StarContentActions.BeginGetStarsContentAction({
              payload: this.starId
            })
          );
        }
      })
    );
  }
}
