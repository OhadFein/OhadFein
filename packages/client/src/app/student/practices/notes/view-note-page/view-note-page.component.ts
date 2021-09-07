import { map, takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NoteBaseDto } from '@danskill/contract';
import { NotesService } from '@app/_infra/core/services/notes.service';

@Component({
  selector: 'dsapp-view-note-page',
  templateUrl: './view-note-page.component.html',
  styleUrls: ['./view-note-page.component.scss']
})
export class ViewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
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
    private router: Router,
    private upperToolbarService: UpperToolbarService,
    private notesService: NotesService
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
      this.noteId = params.get('noteId');
      this.getNoteDetails(this.noteId);
    });
  }

  getNoteDetails(noteId: string): void {
    this.notesService
      .getNote(noteId)
      .pipe(
        map((note: NoteBaseDto) => {
          this.noteTitle = note.title;
          this.noteText = note.content;
          this.noteLastUpdateDate = note.updatedAt;
        })
      )
      .subscribe();
  }

  updateNote(): void {
    this.notesService.updateNote(this.noteId, this.noteTitle, this.noteText);
    this.editMode = false;
    this.router.navigate([this.route.url]);
  }

  deleteNote(): void {
    this.notesService.deleteNote(this.noteId);
    this.router.navigate(['../..'], { relativeTo: this.route });
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
