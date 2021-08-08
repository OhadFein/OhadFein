import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dsapp-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() public label: string;

  // @Input() public value: string = '';

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

  @Input() public options;

  @Input() placeholder = '';

  @Output() select = new EventEmitter<string>();

  private unsubscribe = new Subject<void>();

  control = new FormControl('');

  ngOnInit(): void {
    if (this.disabled) {
      this.control.disable();
    }
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: string) => this.select.emit(value));
  }

  private updateControlValue(value: string) {
    this.control.patchValue(value);
  }
}
