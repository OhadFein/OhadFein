import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { VideoPlayerModalComponent } from '@infra/ui';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, take } from 'rxjs/operators';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import { StarDto } from '@danskill/contract';
import { StarsService } from '@core/services';

@Component({
  selector: 'dsapp-star-content-page',
  templateUrl: './star-content-page.component.html',
  styleUrls: ['./star-content-page.component.scss']
})
export class StarContentPageComponent implements OnInit, OnDestroy {
  slug = null;

  user: StarDto;

  loading = true;

  subs: Subscription[] = [];

  @ViewChild('stardescription')
  starDescriptionEl: ElementRef;

  isReadMore: boolean;

  showMore = false;

  noResultMessage: string;

  private unsubscribe = new Subject<void>();

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private starService: StarsService,
    private studentStoreService: StudentStoreService
  ) {}

  ngOnInit(): void {
    this.isOverflown();
    this.route.params
      .pipe(
        take(1),
        filter((params: Params) => params.slug),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((params: Params) => this.initUser(params.slug));
  }

  isOverflown(): void {
    setTimeout(() => {
      if (this.starDescriptionEl) {
        const element = this.starDescriptionEl.nativeElement;
        if (
          element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth
        ) {
          this.isReadMore = true;
        }
      }
    }, 1000);
  }

  readMore(): void {
    this.starDescriptionEl.nativeElement.classList.add('show-more');
    this.showMore = true;
    this.isReadMore = false;
  }

  readLess(): void {
    this.starDescriptionEl.nativeElement.classList.add('show-more');
    this.showMore = false;
    this.isReadMore = true;
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

  private initUser(slug: string): void {
    this.slug = slug;
    this.user = this.studentStoreService.getStarBySlug(this.slug);

    if (!this.user && this.slug) {
      this.starService.getStarBySlug(this.slug).subscribe(
        (star: StarDto) => {
          this.user = star;
          this.studentStoreService.setStars([star]);
        },
        () => {
          this.noResultMessage = 'Sorry, there is no star with such name';
        }
      );
    }
  }
}
