import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dsapp-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent {
  @Input() public label: string;

  @Input() public value: string;

  @Input() public disabled: boolean = false;

  @Output() input = new EventEmitter<string>();

  control = new FormControl('');

  private unsubscribe = new Subject<void>();

  ngOnInit(): void {
    if (this.disabled) {
      this.control.disable();
    }
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(300))
      .subscribe((value: string) => this.input.emit(value));
  }
}
