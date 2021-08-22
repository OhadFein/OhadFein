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

  noteTitle = '';

  noteText = '';

  private unsubscribe: Subject<void> = new Subject();

  @ViewChild('saveBtn')
  private saveButtonTemplate: ElementRef;

  public now: string = this.formatDateTime(new Date());

  constructor(private route: ActivatedRoute, private upperToolbarService: UpperToolbarService) {
    setInterval(() => {
      this.now = this.formatDateTime(new Date());
    }, 60000);
  }

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

  formatDateTime(date: Date): string {
    return formatDate(date, 'dd/LL HH:mm', 'en');
  }
}
