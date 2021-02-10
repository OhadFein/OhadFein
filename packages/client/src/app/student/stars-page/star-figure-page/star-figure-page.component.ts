import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Figure, LabItem, LabStarVideo, IStar, Video, VideoType, ETabs } from '@core/models';
import * as FigureActions from '@app/_infra/store/actions/figures.actions';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import * as FigureSelectors from '@infra/store/selectors/figures.selectors';
import * as StarSelectors from '@infra/store/selectors/stars.selectors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as LabActions from '@store/actions/lab.actions';
import { from, Subscription } from 'rxjs';
import { StarFigureService } from '../star-figure-page/figure-page.service'
import { Event, NavigationEnd } from '@angular/router';

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
  currentVideo: Video = null;
  subs: Subscription[] = [];
  public activeTab: string;
  tabs = [ETabs.preview, ETabs.Principles, ETabs.Movements, ETabs.Practices]

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private starFigureService: StarFigureService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event?.url;
        const routeLength = url?.split('/').length;
        const lastParam = url?.split('/')[routeLength - 1];
        if (this.tabs.find((tab) => tab === lastParam)) {
          this.activeTab = lastParam;
        }
        else {
          this.activeTab = ETabs.preview
        }
        if(this.figure){
          // this.splitVideosByType();
          // this.getCurrentVideo();
        }
      }

    });


  }

  ngOnInit() {

  
    this.getFigureId();

    this.getStar()

    this.getFigure();

  

  }

  navigateToTab(tab){
    // console.log('tab :>> ', tab);
    this.activeTab = tab; 
    this.router.navigate([tab], {relativeTo: this.route})
    this.getCurrentVideo();
  }

  getCurrentVideo(){
    if(this.activeTab === 'Outline'){
      this.currentVideo = this.promoVideo;     
      // this.cdRef.detectChanges(); 
   
    }
    if(this.activeTab === 'Principles'){
      this.currentVideo = this.basicPrinciplesVideos[0];
      // this.cdRef.detectChanges(); 

    }
    if(this.activeTab === 'Movements'){
      this.currentVideo = this.comparableVideos[0];
      // this.cdRef.detectChanges(); 
    }
  }
  
  getFigure() {
    this.subs.push(
      this.store.select(FigureSelectors.selectFigureById(this.figureId)).subscribe(
        figure => {
          if (figure) {
            this.figure = { ...figure };
            this.splitVideosByType();
            this.starIsLoading = false;
            this.getCurrentVideo();
            
          } else {
            setTimeout(() => { this.store.dispatch(FigureActions.BeginGetFigureAction({ payload: this.figureId })); }, 1000);
          }
        })
    )
  }

  getStar(): void {
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
  }

  getFigureId(): void {
    this.subs.push(
      this.route.params.subscribe((params: ParamMap) => {
        this.slug = params['slug'];
        this.figureId = params['figureId'];
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
          this.promoVideo = video;
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
