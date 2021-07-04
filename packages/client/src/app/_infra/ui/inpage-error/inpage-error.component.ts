import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AlertType } from '@infra/core/models';

@Component({
  selector: 'dsapp-inpage-error',
  templateUrl: './inpage-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InpageErrorComponent implements OnInit {
  @Input() heading: string = null;
  @Input() msg: string = null;
  @Input() btnLabel? = 'COMMON.tryAgain';
  @Input() type?: AlertType = AlertType.Error;
  @Output() action = new EventEmitter();

  showAction = false;

  constructor() {}

  ngOnInit() {
    this.showAction = this.action.observers.length > 0;
  }

  onAction() {
    this.action.emit(null);
  }

  cssClass() {
    // return css class based on alert type
    switch (this.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
