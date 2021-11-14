import { UpperToolbarService } from '@ui/upper-toolbar/upper-toolbar.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PracticesService, UserService, AlertService, StarsService } from '@core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LAB_USER_VIDEO_DURATION_DIFF_LIMIT, LabViewType, LabPlayerType } from '@core/models/';
import { Subscription } from 'rxjs';
import { FigureVideoDto, UserDto, PracticeBaseDto } from '@danskill/contract';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dsapp-lab-page',
  templateUrl: './lab-page.component.html',
  styleUrls: ['./lab-page.component.scss']
})
export class LabPageComponent implements OnInit, OnDestroy {
  userVideo: File;

  userVideoPath: string | SafeUrl;

  practiceIsSaved = false;

  starFigureVideo: FigureVideoDto = null;

  labView: LabViewType = LabViewType.EMPTY;

  subs: Subscription[] = [];

  disableSavePracticesButton = false;

  disableUserVideoButtons = false;

  @Output() isPlayerReady = new EventEmitter<boolean>();

  private maxVideoDuration = 30;

  user: UserDto;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private starService: StarsService,
    private userService: UserService,
    private practiceService: PracticesService,
    private sanitizer: DomSanitizer,
    private upperToolbarService: UpperToolbarService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        const figureVideoId = params.get('figureVideoId');

        this.initLabItem(figureVideoId);
        // this.setLabView();
      })
    );

    this.subs.push(
      this.route.queryParams.pipe(filter((params) => params.practiceId)).subscribe((params) => {
        this.practiceService.getPractice(params.practiceId).subscribe((practice) => {
          this.userVideoPath = practice.url;
          this.disableSavePracticesButton = true;
          this.setLabView();
        });
      })
    );
  }

  initLabItem(figureVideoId: string): void {
    this.userService.getUser().subscribe((user: UserDto) => {
      this.starService
        .getFigureVideoById(figureVideoId)
        .subscribe((figureVideo: FigureVideoDto) => {
          this.starFigureVideo = figureVideo;
          this.user = user;
          const pageName = `${this.starFigureVideo.stars[0].firstName} ${this.starFigureVideo.stars[0].lastName}: ${this.starFigureVideo.figure.name}`;
          this.upperToolbarService.setPageName(pageName);
          this.setLabView();
        });
    });
  }

  setLabView(): void {
    if (!this.starFigureVideo) {
      this.labView = LabViewType.EMPTY;
    } else {
      this.labView =
        this.starFigureVideo && this.userVideoPath ? LabViewType.FULL : LabViewType.PREVIEW;
    }
  }

  setDurationLimit(masterDuration: number): void {
    this.maxVideoDuration = masterDuration + LAB_USER_VIDEO_DURATION_DIFF_LIMIT;
  }

  userVideoFileChanged(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.userVideo = file;
      this.userVideoPath = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.disableSavePracticesButton = false;
      this.setLabView();
    }
  }

  checkUserVideoDuration(event): void {
    const { duration } = event.target;
    if (duration > this.maxVideoDuration) {
      this.clearUserVideo();
      this.alertService.error('LAB.ERRORS.userDurationError', this.maxVideoDuration.toString());
    } else {
      this.practiceIsSaved = false;
    }
  }

  clearUserVideo(): void {
    this.userVideo = null;
    this.practiceIsSaved = false;
  }

  clearVideo(videoType: LabPlayerType): void {
    this.practiceIsSaved = false;
    if (videoType === LabPlayerType.STUDENT) {
      this.userVideo = null;
      this.userVideoPath = null;
      this.setLabView();
    }
  }

  masterVideoReady(): void {
    this.disableUserVideoButtons = false;
  }

  saveToPractices(): void {
    // TODO Add loader
    const data = new FormData();
    data.append(
      'name',
      `${this.user.firstName} ${this.user.lastName} ${this.starFigureVideo.name}`
    );
    data.append('video', this.userVideo);
    this.practiceService
      .uploadPractice(this.starFigureVideo._id.toString(), data)
      .subscribe((practice: PracticeBaseDto) => {
        this.router.navigate(['/student', 'practices', practice._id]);
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
