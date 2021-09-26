import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VideoPlayerModalComponent } from '@infra/ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, take } from 'rxjs/operators';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import { FigureBaseDto, StarDto } from '@danskill/contract';
import { StarsService } from '@core/services';

interface DanceStyles {
  [danceStyle: string]: FigureBaseDto[];
}

@Component({
  selector: 'dsapp-star-content-page',
  templateUrl: './star-content-page.component.html',
  styleUrls: ['./star-content-page.component.scss']
})
export class StarContentPageComponent implements OnInit, OnDestroy {
  slug = null;

  user: StarDto;

  loading = true;

  noResultMessage: string;

  danceStyles: DanceStyles;

  private unsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private starService: StarsService,
    private studentStoreService: StudentStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        take(1),
        filter((params: Params) => params.slug),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((params: Params) => {
        this.initUser(params.slug);
        if (this.user) {
          this.initUserDanceStyles(this.user.figures);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  openPromoModal(): void {
    const { firstName, lastName, promoVideo } = this.user;
    const modalRef = this.modalService.open(VideoPlayerModalComponent, {
      size: 'xl',
      centered: true
    });
    modalRef.componentInstance.videoURL = promoVideo;
    modalRef.componentInstance.title = `${firstName} ${lastName}`;
    modalRef.componentInstance.autoplay = true;
  }

  onViewAllFiguresByType(figureType: string): void {
    this.router.navigate(['/student', 'star', this.slug, 'style', figureType]);
  }

  onOpenFigureItem(figureId: string): void {
    this.router.navigate(['/student', 'star', this.slug, 'figure', figureId]);
  }

  private initUser(slug: string): void {
    this.slug = slug;
    this.user = this.studentStoreService.getStarBySlug(this.slug);

    if (!this.user && this.slug) {
      this.starService.getStarBySlug(this.slug).subscribe(
        (star: StarDto) => {
          this.user = star;
          this.studentStoreService.setStars([star]);
          this.initUserDanceStyles(this.user.figures);
        },
        () => {
          this.noResultMessage = 'Sorry, there is no star with such name';
        }
      );
    }
  }

  private initUserDanceStyles(figures: unknown[]): void {
    console.log('look here', figures);
    const danceStyles: DanceStyles = {};
    figures.forEach((figure: FigureBaseDto) => {
      if (danceStyles[figure.type]) {
        danceStyles[figure.type].push(figure);
      } else {
        danceStyles[figure.type] = [figure];
      }
    });
    this.danceStyles = danceStyles;
  }
}
