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

  _noteTitle = '';

  _noteText = '';

  @Input()
  noteDate = new Date();

  _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    if (!value) {
      this.titleControl.enable();
      this.bodyControl.enable();
    } else {
      this.titleControl.disable();
      this.bodyControl.disable();
    }
  }

  @Input()
  get noteTitle(): string {
    return this._noteTitle;
  }

  set noteTitle(value: string) {
    this._noteTitle = value;
    this.updateTitleControlValue(value);
  }

  @Input()
  get noteText(): string {
    return this._noteText;
  }

  set noteText(value: string) {
    this._noteText = value;
    this.updateNoteControlValue(value);
  }

  @Output() titleChange = new EventEmitter<string>();

  @Output() bodyChange = new EventEmitter<string>();

  titleControl = new FormControl('');

  bodyControl = new FormControl('');

  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private upperToolbarService: UpperToolbarService) {
    setInterval(() => {
      this.noteDate = new Date();
    }, 60000);
  }

  ngOnInit(): void {
    this.getPracticeId();
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

  private updateTitleControlValue(value: string) {
    this.titleControl.patchValue(value);
  }

  private updateNoteControlValue(value: string) {
    this.bodyControl.patchValue(value);
  }
}
