import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dsapp-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent {
  @Input() public label: string;

  @Input() public value: string;

  @Input() public disabled: boolean = false;
}
