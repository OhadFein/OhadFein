import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-new-note-page',
  templateUrl: './new-note-page.component.html',
  styleUrls: ['./new-note-page.component.scss']
})
export class NewNotePageComponent implements OnInit, OnDestroy, AfterViewInit {
  practiceId: string = null;

  noteTitle = '';

  noteText = '';

  subs: Subscription[] = [];

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
    this.subs.forEach((s) => s.unsubscribe());
    this.upperToolbarService.setDefaultButtonsComponent();
  }

  ngAfterViewInit(): void {
    this.upperToolbarService.setCustomButtonsComponent(this.saveButtonTemplate);
  }

  getPracticeId(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        this.practiceId = params.get('practiceId');
      })
    );
  }

  saveNote(): void {
    console.log('Saving new note: title: ' + this.noteTitle + ' body: ' + this.noteText);
  }

  formatDateTime(date: Date): string {
    return formatDate(date, 'dd/LL HH:mm', 'en');
  }
}
