import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dsapp-new-note-page',
  templateUrl: './new-note-page.component.html',
  styleUrls: ['./new-note-page.component.scss']
})
export class NewNotePageComponent implements OnInit, OnDestroy {
  practiceId: string = null;

  noteTitle = '';

  noteText = '';

  subs: Subscription[] = [];

  public now: string = this.formatDateTime(new Date());

  constructor(private route: ActivatedRoute) {
    setInterval(() => {
      this.now = this.formatDateTime(new Date());
    }, 60000);
  }

  ngOnInit(): void {
    this.getPracticeId();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  getPracticeId(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params) => {
        this.practiceId = params.get('practiceId');
      })
    );
  }

  saveNote(): void {
    //
  }

  formatDateTime(date: Date): string {
    return formatDate(date, 'dd/LL HH:mm', 'en');
  }
}
