import { takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotesService } from '@app/_infra/core/services/notes.service';

@Component({
  selector: 'dsapp-new-note-page',
  templateUrl: './new-note-page.component.html',
  styleUrls: ['./new-note-page.component.scss']
})
export class NewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
  practiceId: string = null;

  noteTitle: string;

  noteText: string;

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild('saveBtn')
  private saveButtonTemplate: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private upperToolbarService: UpperToolbarService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.getPracticeId();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.upperToolbarService.setDefaultButtonsComponent();
  }

  ngAfterViewInit(): void {
    this.upperToolbarService.setCustomButtonsComponent(this.saveButtonTemplate);
  }

  getPracticeId(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.practiceId = params.get('practiceId');
    });
  }

  saveNote(): void {
    this.notesService
      .createNote(this.practiceId, this.noteTitle, this.noteText)
      .toPromise()
      .then(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }

  onTitleChange(value: string): void {
    this.noteTitle = value;
  }

  onBodyChange(value: string): void {
    this.noteText = value;
  }
}
