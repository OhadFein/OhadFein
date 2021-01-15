import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Figure, LabItem, LabStarVideo, IStar, Video, VideoType } from '@app/_infra/core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as LabActions from '@store/actions/lab.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dsapp-star-figure-page',
  templateUrl: './star-figure-page.component.html',
})
export class StarFigurePageComponent implements OnInit, OnDestroy {

  slug = null;
  star: IStar = null;
  figure: Figure = null;
  figureId = null;
  starIsLoading = true;
  figureIsLoading = true;
  loading = true;

  basicPrinciplesVideos: Array<Video> = [];
  comparableVideos: Array<Video> = [];
  additionalVideos: Array<Video> = [];
  promoVideo: Video = null;

  subs: Subscription[] = [];


  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {

    this.subs.push(
      this.route.params.subscribe((params: ParamMap) => {

        this.slug = params['slug'];
        this.figureId = params['figureId'];
      })
    )

    this.subs.push(
      this.store.select(StarSelectors.selectStarBySlug(this.slug)).subscribe(
        star => {
          if (star) {
            this.star = { ...star };
            this.starIsLoading = false;
          } else {
            this.store.dispatch(StarsActions.BeginGetStarsAction());
          }
        })
    )

    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = { ...figure };
            this.splitVideosByType();
            this.starIsLoading = false;
          } else {
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

  splitVideosByType(): void {
    this.basicPrinciplesVideos = [];
    this.comparableVideos = [];
    this.additionalVideos = [];

    this.figure.videos.forEach(video => {
      switch (video.type) {
        case VideoType.BASIC_PRINCIPLES:
          this.basicPrinciplesVideos.push(video);
          break;
        case VideoType.COMPARABLE:
          this.comparableVideos.push(video);
          break;
        case VideoType.TIPS:
          this.additionalVideos.push(video);
          // TODO: add additional video functionality
          break;
        case VideoType.EXERCISES:
          this.additionalVideos.push(video);
          // TODO: add additional video functionality
          break;
        case VideoType.PROMO:
          this.promoVideo = { ...video }
          break;
      }
    })

  }

  learnPrinciples(url: string, name: string): void {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.videoURL = url;
    modalRef.componentInstance.title = name;
    modalRef.componentInstance.autoplay = true;
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

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

}
