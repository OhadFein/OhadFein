import { debounceTime, takeUntil } from 'rxjs/operators';
import { UpperToolbarService } from '@app/_infra/ui/upper-toolbar/upper-toolbar.service';
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dsapp-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NotePageComponent implements OnInit, OnDestroy {
  practiceId: string = null;

  @Input()
  noteTitle = '';

  @Input()
  noteText = '';

  @Output() titleChange = new EventEmitter<string>();

  @Output() bodyChange = new EventEmitter<string>();

  titleControl = new FormControl('');

  bodyControl = new FormControl('');

  private unsubscribe: Subject<void> = new Subject();

  public now: string = this.formatDateTime(new Date());

  constructor(private route: ActivatedRoute, private upperToolbarService: UpperToolbarService) {
    setInterval(() => {
      this.now = this.formatDateTime(new Date());
    }, 60000);
  }

  ngOnInit(): void {
    this.getPracticeId();
    // if (this.disabled) {
    //   this.control.disable();
    // }
    this.titleControl.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe((value: string) => this.titleChange.emit(value));
    this.bodyControl.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe((value: string) => this.bodyChange.emit(value));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getPracticeId(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      this.practiceId = params.get('practiceId');
    });
  }

  formatDateTime(date: Date): string {
    return formatDate(date, 'dd/LL HH:mm', 'en');
  }
}
