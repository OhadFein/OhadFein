import { takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsapp-new-note-page',
  templateUrl: './new-note-page.component.html',
  styleUrls: ['./new-note-page.component.scss']
})
export class NewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
  practiceId: string = null;

  noteTitle;

  noteText;

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild('saveBtn')
  private saveButtonTemplate: ElementRef;

  constructor(private route: ActivatedRoute, private upperToolbarService: UpperToolbarService) {}

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
    console.log('Saving new note: title: ' + this.noteTitle + ' body: ' + this.noteText);
  }

  onTitleChange(value: string): void {
    this.noteTitle = value;
  }

  onBodyChange(value: string): void {
    this.noteText = value;
  }
}
