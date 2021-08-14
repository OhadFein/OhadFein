import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dsapp-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTexareaComponent {
  @Input() public label: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.updateControlValue(value);
  }

  private _value = '';

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

  private updateControlValue(value: string) {
    this.control.patchValue(value);
  }
}
