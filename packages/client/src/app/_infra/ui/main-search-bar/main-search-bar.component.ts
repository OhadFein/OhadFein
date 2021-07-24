import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsapp-main-search-bar',
  templateUrl: './main-search-bar.component.html',
  styleUrls: ['./main-search-bar.component.scss']
})
export class MainSearchBarComponent implements OnInit {
  @Input() placeholder = '';

  @Output() search = new EventEmitter<string>();

  control = new FormControl('');

  private unsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe((value: string) => this.search.emit(value));
  }
}
