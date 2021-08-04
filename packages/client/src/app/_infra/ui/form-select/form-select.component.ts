import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dsapp-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() public label: string;

  @Input() public value: string;

  @Input() public disabled: boolean = false;

  @Input() public options;

  @Input() placeholder = '';

  @Output() select = new EventEmitter<string>();

  control = new FormControl('');

  private unsubscribe = new Subject<void>();

  ngOnInit(): void {
    if (this.disabled) {
      this.control.disable();
    }
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe((value: string) => this.select.emit(value));
  }
}
