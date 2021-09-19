import { map, takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NoteDto } from '@danskill/contract';
import { NotesService } from '@app/_infra/core/services/notes.service';

@Component({
  selector: 'dsapp-view-note-page',
  templateUrl: './view-note-page.component.html',
  styleUrls: ['./view-note-page.component.scss']
})
export class ViewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
  noteId: string = null;

  noteTitle: string;

  noteText: string;

  practiceId: string;

  noteLastUpdateDate: Date;

  editMode: boolean = false;

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild('updateBtn')
  private updateButtonTemplate: ElementRef;

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
      .toPromise()
      .then((note: NoteDto) => {
        this.practiceId = note.practice._id.toString();
        this.noteTitle = note.title;
        this.noteText = note.content;
        this.noteLastUpdateDate = note.updatedAt;
      });
  }

  updateNote(): void {
    this.notesService
      .updateNote(this.noteId, this.noteTitle, this.noteText)
      .toPromise()
      .then(() => {
        this.editMode = false;
        this.upperToolbarService.setCustomButtonsComponent(this.editAndDeleteBtnTemp);
        this.router.navigate([this.router.url]);
      });
  }

  deleteNote(): void {
    this.notesService
      .deleteNote(this.noteId)
      .toPromise()
      .then(() => {
        this.router.navigate([`../../${this.practiceId}`], { relativeTo: this.route });
      });
  }

  editNote(): void {
    this.editMode = true;
    this.upperToolbarService.setCustomButtonsComponent(this.updateButtonTemplate);
  }

  onTitleChange(value: string): void {
    this.noteTitle = value;
  }

  onBodyChange(value: string): void {
    this.noteText = value;
  }
}
