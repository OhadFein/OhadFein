import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params, RouterEvent } from '@angular/router';
import { LabStarVideo, FigurePageTab } from '@core/models';
import { VideoPlayerModalComponent } from '@app/_infra/ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { filter, finalize, take, takeUntil } from 'rxjs/operators';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import {
  EnumVideoType,
  FigureDto,
  FigureVideoBaseDto,
  PracticeDto,
  StarDto
} from '@danskill/contract';
import { PracticesService, StarsService, UserService } from '@core/services';

@Component({
  selector: 'dsapp-star-figure-page',
  templateUrl: './star-figure-page.component.html',
  styleUrls: ['./star-figure-page.component.scss']
})
export class StarFigurePageComponent implements OnInit, OnDestroy {
  slug = null;

  userSlug: string;

  star: StarDto = null;

  figure: FigureDto = null;

  figureId = null;

  starIsLoading = true;

  figureIsLoading = true;

  loading = true;

  practices: PracticeDto[];

  basicPrinciplesVideos: FigureVideoBaseDto[] = [];

  comparableVideos: FigureVideoBaseDto[] = [];

  additionalVideos: FigureVideoBaseDto[] = [];

  promoVideo: FigureVideoBaseDto = null;

  currentVideo: FigureVideoBaseDto = null;

  activeTab: FigurePageTab;

  tabs = [FigurePageTab.Movements, FigurePageTab.Educational, FigurePageTab.Practices];

  test: any;

  private unsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private studentStoreService: StudentStoreService,
    private starService: StarsService,
    private practicesService: PracticesService,
    private userService: UserService,
    private upperToolbarService: UpperToolbarService
  ) {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      )
      .subscribe(({ url }: { url: string }) => {
        const index = url.lastIndexOf('/');
        const urlOptions = url.slice(index);
        this.activeTab =
          this.tabs.find((tab: FigurePageTab) => urlOptions.includes(tab)) ||
          FigurePageTab.Movements;
      });
  }

  ngOnInit(): void {
    this.setFigureId();
    this.userService.getUser().subscribe((user) => {
      this.userSlug = user.slug;
      this.setStar();
      this.setFigure();
      this.getPractices();
    });
  }

  navigateToTab(tab: FigurePageTab): void {
    this.activeTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
    this.setCurrentVideo();
  }

  onVideoCompare(video: FigureVideoBaseDto): void {}

  onVideoPreview(video: FigureVideoBaseDto): void {
    this.currentVideo = video;
  }

  getPracticeLabel(label: string): string {
    const practices = this.practices?.length;
    if (practices && practices < 9) {
      return `${label} (${practices})`;
    }
    if (practices > 9) {
      return `${label} (9+)`;
    }

    return label;
  }

  setCurrentVideo(): void {
    if (this.activeTab === FigurePageTab.Movements) {
      this.currentVideo = this.comparableVideos[0];
    } else if (this.activeTab === FigurePageTab.Educational) {
      this.currentVideo = this.basicPrinciplesVideos[0];
    } else {
      this.currentVideo = this.promoVideo;
    }
  }

  setFigure(): void {
    this.starService
      .getFigureById(this.figureId)
      .pipe(
        filter((figure: FigureDto) => !!figure._id),
        finalize(() => {
          this.starIsLoading = false;
        })
      )
      .subscribe((figure: FigureDto) => {
        this.figure = figure;
        this.upperToolbarService.setPageName(figure.type);
        this.splitVideosByType();
        this.setCurrentVideo();
      });
  }

  setStar(): void {
    if (this.slug) {
      this.star = this.studentStoreService.getStarBySlug(this.slug);
      if (this.star) {
        this.starIsLoading = false;
      } else {
        this.starService
          .getStarBySlug(this.slug)
          .pipe(
            finalize(() => {
              this.starIsLoading = false;
            })
          )
          .subscribe(
            (star: StarDto) => {
              this.star = star;
              this.studentStoreService.setStars([star]);
            },
            () => {
              // this.noResultMessage = 'Sorry, there is no star with such name';
            }
          );
      }
    }
  }

  setFigureId(): void {
    this.route.params
      .pipe(
        take(1),
        filter((params: Params) => params.slug && params.figureId),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((params: Params) => {
        this.slug = params.slug;
        this.figureId = params.figureId;
      });
  }

  splitVideosByType(): void {
    this.basicPrinciplesVideos = [];
    this.comparableVideos = [];
    this.additionalVideos = [];
    this.figure.videos.forEach((video: FigureVideoBaseDto) => {
      switch (video.type) {
        case EnumVideoType.BasicPrinciples:
          this.basicPrinciplesVideos.push(video);
          break;
        case EnumVideoType.Comparable:
          this.comparableVideos.push(video);
          break;
        case EnumVideoType.Promo:
          this.promoVideo = video;
          break;
        default:
        // Log that not handled type of the video
      }
    });
  }

  learnPrinciples(url: string, name: string): void {
    const modalRef = this.modalService.open(VideoPlayerModalComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.videoURL = url;
    modalRef.componentInstance.title = name;
    modalRef.componentInstance.autoplay = true;
  }

  getPractices(): void {
    this.practicesService.getPractices(this.userSlug).subscribe((practices: PracticeDto[]) => {
      this.practices = practices;
    });
  }

  openInLab(starVideo: LabStarVideo): void {
    // const labItem: LabItem = {
    //   user: this.star,
    //   figure: this.figure,
    //   starVideo
    // };
    // this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));
    // this.router.navigate(['/', 'student', 'lab']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
