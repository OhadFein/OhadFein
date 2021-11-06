import { PracticesService, UserService, AlertService, StarsService } from '@core/services';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LAB_USER_VIDEO_DURATION_DIFF_LIMIT, LabItem, LabViewType } from '@core/models/';
import { Subscription } from 'rxjs';
import { FigureDto, UserDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-lab-page',
  templateUrl: './lab-page.component.html',
  styleUrls: ['./lab-page.component.scss']
})
export class LabPageComponent implements OnInit, OnDestroy {
  userVideo: File;

  practiceIsSaved = false;

  // labItem: LabItem = null;

  starFigure: FigureDto = null;

  labView: LabViewType = LabViewType.EMPTY;

  subs: Subscription[] = [];

  // steps: any;

  // currentStep: number;

  disableSavePracticesButton = false;

  disableUserVideoButtons = true;

  @Output() isPlayerReady = new EventEmitter<boolean>();

  private maxVideoDuration = 0;

  user: UserDto;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private starService: StarsService,
    private userService: UserService,
    private practiceService: PracticesService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        const figureVideoId = params.get('figureVideoId');
        this.initLabItem(figureVideoId);
        this.setLabView();
      })
    );

    // this.steps = [
    //   { id: 1, key: 'empty', name: 'Star video' },
    //   { id: 2, key: 'preview', name: 'User video' },
    //   { id: 3, key: 'full', name: 'Analysis' }
    // ];

    // this.subs.push(
    //   this.store.select(labSelectors.selectCurrentLabItem()).subscribe((res) => {
    //     if (res && res.practiceIsSaved === undefined && res.userVideo) {
    //       this.disableSavePracticesButton = true;
    //     }
    //     // this.labItem = res ? { ...res } : null;
    //     this.setLabView();
    //   })
    // );
    // this.subs.push(
    //   this.store.select(userSelectors.selectCurrentUser()).subscribe((res) => {
    //     if (res) {
    //       this.userStamp = `user_${res._id}_${res.profile.name.firstName}_${res.profile.name.lastName}`;
    //     } else {
    //       this.store.dispatch(UserActions.BeginGetUserAction());
    //     }
    //   })
    // );
    // this.setLabView();
  }

  initLabItem(figureId: string): void {
    this.userService.getUser().subscribe((user: UserDto) => {
      this.starService.getFigureById(figureId).subscribe((figure: FigureDto) => {
        this.starFigure = figure;
        this.user = user;
        // this.labItem = {
        //   user,
        //   figure,
        //   starVideo: figure.videos[0],
        //   practiceIsSaved: false
        // };
      });

      // user: UserDto;
      // figure: FigureDto;
      // starVideo: FigureVideoDto;
      // userVideo?: FigureVideoDto;
      // practiceIsSaved?: boolean;

      // this.upperToolbarService.setPageName(figure.type);
      // this.splitVideosByType();
      // this.setCurrentVideo();
    });
  }

  setLabView(): void {
    if (!this.starFigure) {
      this.labView = LabViewType.EMPTY;
    } else {
      this.labView = this.starFigure && this.userVideo ? LabViewType.FULL : LabViewType.PREVIEW;
    }
  }

  setDurationLimit(masterDuration: number): void {
    this.maxVideoDuration = masterDuration + LAB_USER_VIDEO_DURATION_DIFF_LIMIT;
  }

  userVideoFileChanged(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.userVideo = file;
      this.disableSavePracticesButton = false;
    }
  }

  checkUserVideoDuration(event: Event): void {
    const duration = event.target.duration;
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

  // clearVideo(type: LabPlayerType): void {
  //   switch (type) {
  //     case LabPlayerType.MASTER:
  //       this.clearLabItem();
  //       break;
  //     case LabPlayerType.STUDENT:
  //       this.clearUserVideo();
  //       break;
  //   }
  // }

  masterVideoReady(): void {
    this.disableUserVideoButtons = false;
  }

  // updateLabStore() {
  //   const payload: LabItem = {
  //     ...this.labItem,
  //     userVideo: this.userVideo,
  //     practiceIsSaved: this.practiceIsSaved
  //   };
  //   this.store.dispatch(LabActions.UpdateLabAction({ payload }));
  // }

  saveToPractices(): void {
    this.practiceService.uploadPractice(this.starFigure._id.toString(), this.userVideo);
    // const data: CreatePracticeData = new FormData();
    // data.append(
    //   'name',
    //   `${this.labItem.user.given_name} ${this.labItem.user.family_name} ${this.labItem.figure.name}`
    // );
    // data.append('associatedVideoId', this.labItem.starVideo._id);
    // data.append('video', this.labItem.userVideo.file);
    // data.append('starId', this.labItem.user._id);
    // data.append('figureId', this.labItem.figure._id);
    // this.backgroundProcessesService.uploadPractice(data, `upload_practice_${this.userStamp}`);
    // this.userVideo = this.labItem.userVideo;
    this.practiceIsSaved = true;

    setTimeout(() => {
      this.practiceIsSaved = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
