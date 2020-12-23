import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabItem, LabStarVideo, Practice, PracticeError, LabUserVideo, Star, Figure } from '@app/_infra/core/models';
import { AlertErrorService } from '@app/_infra/core/services';
import * as PracticeAction from '@app/_infra/store/actions/practices.actions';
import * as selectors from '@app/_infra/store/selectors/practices.selector';
import * as starsSelectors from '@app/_infra/store/selectors/stars.selectors';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import * as PracticesAction from '@store/actions/practices.actions';
import * as LabActions from '@store/actions/lab.actions';
import * as StarsActions from '@store/actions/stars.actions';

@Component({
    selector: 'dsapp-practice-page',
    templateUrl: './practice-page.component.html',
    styles: []
})

export class PracticePageComponent implements OnInit, OnDestroy {

    practiceId: string = null;
    loading = true;
    practice: Practice = null;
    disabled = true;
    disabledNote = true;
    disabledTitle = true;
    practiceTitleInput = '';
    practiceNotes = '';
    hiddenVideo = false;
    hiddenNotes = false;
    noteButtonText = '';
    videoButtonText = '';
    storeSelectSub: Subscription = null;
    subs: Subscription[] = [];
    starsSubs: Subscription[] = [];

    errorMsg: PracticeError | string = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private store: Store<any>,
        private errorService: AlertErrorService
    ) {
    }

    ngOnInit(): void {

        this.translateContent()
        this.getPractice(false, null);

    }

    ngOnDestroy(): void {
        if (this.storeSelectSub) {
            this.storeSelectSub.unsubscribe();
        }
        this.subs.forEach(s => s.unsubscribe());
    }

    getPractice(isUpdate, practiceNotes) {
        this.subs.push(
            this.route.paramMap.subscribe(params => {
                this.practiceId = params.get('practiceId');
                this.storeSelectSub =
                    this.store.select(selectors.selectPracticeById(this.practiceId)).subscribe(
                        practice => {
                            if (practice) {
                                this.practice = { ...practice };
                                this.loading = false;
                                this.practiceTitleInput = practice.name;
                                this.practiceNotes = practice.notes;
                                if (isUpdate) {
                                    this.disabled = true;
                                    this.disabledNote = true;
                                    this.practiceNotes = practiceNotes;
                                }
                            } else {
                                this.store.dispatch(PracticeAction.BeginGetPracticesAction());
                            }
                        }
                    );
            })
        );

        this.subs.push(
            this.store.select(
                selectors.selectPracticesError()).subscribe(res => {
                    if (res && res.type) {
                        this.practice = null;
                        this.loading = false;
                        this.errorMsg = this.errorService.alertStarsError(res.type);
                    }
                })
        );
    }

    translateContent() {
        this.translate.get('PRACTICES.PRACTICE.hideNotes').subscribe((res: string) => {
            this.noteButtonText = res;
        });

        this.translate.get('PRACTICES.PRACTICE.hideVideo').subscribe((res: string) => {
            this.videoButtonText = res;
        });
    }

    openInLab(practice: Practice): void {
        const userVideo = practice.video;
        const starId = practice.starId;
        let currentStar;
        this.starsSubs.push(
            this.store.select(starsSelectors.selectStarById(starId)).subscribe(
                star => {
                    if (star) {
                        currentStar = { ...star };
                        this.loading = false;
                        const labItem: LabItem = {
                            star: currentStar,
                            figure: (userVideo.associatedObject as any).associatedObject, // TODO: any
                            starVideo: userVideo.associatedObject as any, // TODO: any
                            userVideo,
                        }
                        this.store.dispatch(LabActions.SetLabAction({ payload: labItem }));
                        this.router.navigate(['/', 'student', 'lab']);

                    } else {
                        this.store.dispatch(StarsActions.BeginGetStarsAction());
                    }
                })
        )


    }


    backToPractices() {
        this.router.navigate(['student/practices']);
    }

    editTitle() {
        this.disabledTitle = false;
        this.disabled = false;
    }

    editNote() {
        this.disabledNote = false;
        this.disabled = false;
    }

    saveChanges() {
        this.practice.name = this.practiceTitleInput;
        this.practice.notes = this.practiceNotes;
        this.store.dispatch(PracticesAction.BeginUpdatePracticeItemAction({ payload: this.practice }));
        this.getPractice(true, this.practice.notes);


    }

    toggleVideo() {
        this.hiddenVideo = !this.hiddenVideo;
        if (this.hiddenVideo)
            this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.showVideo');
        else
            this.videoButtonText = this.translateButtons('PRACTICES.PRACTICE.hideVideo');

    }

    toggleNotes() {
        this.hiddenNotes = !this.hiddenNotes;
        if (this.hiddenNotes)
            this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.showNotes');
        else
            this.noteButtonText = this.translateButtons('PRACTICES.PRACTICE.hideNotes');
    }

    translateButtons(translateTerm)
        :
        string {
        let buttonText = '';
        this.translate.get(translateTerm).subscribe((res: string) => {
            buttonText = res;
        });
        return buttonText;
    }
}
