import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

import { FigureDto, NoteBaseDto, PracticeDto, UserBaseDto, UserDto } from '@danskill/contract';
import { TranslateService } from '@ngx-translate/core';
import { PracticeError } from '@app/_infra/core/models';
import { AlertErrorService, PracticesService, UserService } from '@app/_infra/core/services';
import { StudentStoreService } from '@app/student/services/student-store/student-store.service';
import { UpperToolbarService } from '@ui/upper-toolbar/upper-toolbar.service';

@Component({
  selector: 'dsapp-practice-page',
  templateUrl: './practice-page.component.html',
  styleUrls: ['./practice-page.component.scss']
})
export class PracticePageComponent implements OnInit, OnDestroy, AfterViewInit {
  practiceId: string;

  loading = false;

  practice: PracticeDto;

  stars: UserBaseDto[] = [];

  disabled = false; // TODO: can be removed?

  disabledNote = false; // TODO: can be removed?

  disabledTitle = true;

  practiceTitleInput = '';

  practiceNotes: NoteBaseDto[];

  hiddenVideo = false;

  hiddenNotes = false;

  noteButtonText = '';

  videoButtonText = '';

  errorMsg: PracticeError | string = null;

  @ViewChild('editAndDeleteButtons')
  private editAndDeleteBtnTemp: ElementRef;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private errorService: AlertErrorService,
    private studentService: StudentStoreService,
    private practicesService: PracticesService,
    private upperToolbarService: UpperToolbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPractice();
    this.translateContent();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.upperToolbarService.setDefaultButtonsComponent();
  }

  ngAfterViewInit(): void {
    this.userService.getUser().subscribe((user: UserDto) => {
      const { firstName, lastName } = user;
      const name = firstName && lastName ? `${user.firstName} ${user.lastName}` : 'Back';
      this.upperToolbarService.setPageName(name);
    });
  }

  private getPractice(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.practiceId = params.get('practiceId');

      // TODO: not possible atm, practices/all/${slug} has to populate full figure object with stars
      // const selectedPractice = this.studentService.getPracticeById(this.practiceId);

      // if (selectedPractice) {
      //   this.practiceTitleInput = 'Practice'; // TODO: there is no name property for practice atm
      //   this.practiceNotes = selectedPractice.notes;
      //   this.stars = ((selectedPractice.figure as unknown) as FigureDto).stars;
      // } else {
      this.loading = true;
      this.practicesService
        .getPractice(this.practiceId)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            // TODO: properly communicate error to a user
            return of(undefined);
          })
        )
        .subscribe((practice: PracticeDto | undefined) => {
          if (!practice) {
            // TODO: communicate to user that there is no such practice he / she looks for
          } else {
            this.practice = practice;
            this.practiceTitleInput = 'Practice'; // TODO: there is no name property for practice atm
            this.practiceNotes = practice.notes;
            this.stars = ((practice.figure as unknown) as FigureDto).stars;
            this.studentService.setPractices([practice]);
          }
        });
      // }
    });
  }

  onViewMovement(): void {}

  onAddNote(): void {
    this.router.navigate(['./note'], { relativeTo: this.route });
  }

  onEditNote($event): void {
    this.router.navigate([`../notes/${$event.noteId}`], { relativeTo: this.route });
  }

  compareVideos(): void {
    // const userVideo = practice.video;
    // const userVideo = null;
    // const currentStar = practice.star;
    //
    // if (userVideo && currentStar && userVideo) {
    //   this.loading = false;
    //   const labItem: LabItem = {
    //     user: currentStar as any, // TODO: any,
    //     figure: (userVideo.associatedObject as any).associatedObject, // TODO: any
    //     starVideo: userVideo.associatedObject as any, // TODO: any
    //     userVideo
    //   };
    //   this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));
    //   this.router.navigate(['/', 'student', 'lab']);
    // } else {
    //   this.store.dispatch(StarsActions.BeginGetStarsAction());
    // }
  }

  editTitle(): void {
    this.disabledTitle = false;
    this.disabled = false;
  }

  saveChanges(): void {
    this.practice.notes = this.practiceNotes;
    this.getPractice();
  }

  toggleVideo(): void {
    this.hiddenVideo = !this.hiddenVideo;
    if (this.hiddenVideo) {
      this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.showVideo');
    } else {
      this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.hideVideo');
    }
  }

  toggleNotes(): void {
    this.hiddenNotes = !this.hiddenNotes;
    if (this.hiddenNotes) {
      this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.showNotes');
    } else {
      this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.hideNotes');
    }
  }

  private translateButtons(translateTerm: string): string {
    return this.translate.instant(translateTerm);
  }

  private translateContent(): void {
    this.translate.get('PRACTICES.PRACTICE.hideNotes').subscribe((res: string) => {
      this.noteButtonText = res;
    });

    this.translate.get('PRACTICES.PRACTICE.hideVideo').subscribe((res: string) => {
      this.videoButtonText = res;
    });
  }
}
