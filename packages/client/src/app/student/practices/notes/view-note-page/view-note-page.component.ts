import { map, takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PracticesService } from '@app/_infra/core/services';
import { NoteBaseDto, PracticeDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-view-note-page',
  templateUrl: './view-note-page.component.html',
  styleUrls: ['./view-note-page.component.scss']
})
export class ViewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
  practiceId: string = null;

  noteId: string = null;

  noteTitle;

  noteText;

  noteLastUpdateDate;

  editMode: boolean = false;

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild('saveBtn')
  private saveButtonTemplate: ElementRef;

  @ViewChild('editAndDeleteButtons')
  private editAndDeleteBtnTemp: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private upperToolbarService: UpperToolbarService,
    private practicesService: PracticesService
  ) {}

  ngOnInit(): void {
    this.initPracticeDetails();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.upperToolbarService.setDefaultButtonsComponent();
  }

  ngAfterViewInit(): void {
    this.upperToolbarService.setCustomButtonsComponent(this.editAndDeleteBtnTemp);
  }

  initPracticeDetails(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.practiceId = params.get('practiceId');
      this.noteId = params.get('noteId');
      this.getNoteDetails(this.practiceId, this.noteId);
    });
  }

  getNoteDetails(practiceId: string, noteId: string): void {
    this.practicesService
      .getPractice(practiceId)
      .pipe(
        map((practice: PracticeDto) => {
          return this.getNoteFromPractice(practice, noteId);
        }),
        map((note: NoteBaseDto) => {
          this.noteTitle = note.title;
          this.noteText = note.content;
          this.noteLastUpdateDate = note.updatedAt;
        })
      )
      .subscribe();
  }

  getNoteFromPractice(practice: PracticeDto, noteId: string): NoteBaseDto {
    return practice.notes.find((n) => n._id.toString() === noteId);
  }

  saveNote(): void {
    console.log('Saving new note: title: ' + this.noteTitle + ' body: ' + this.noteText);
    this.editMode = false;
  }

  deleteNote(): void {
    console.log('Deleting note: title: ' + this.noteTitle + ' body: ' + this.noteText);
    // Return to practice
  }

  editNote(): void {
    this.editMode = true;
    this.upperToolbarService.setCustomButtonsComponent(this.saveButtonTemplate);
  }

  onTitleChange(value: string): void {
    this.noteTitle = value;
  }

  onBodyChange(value: string): void {
    this.noteText = value;
  }
}
