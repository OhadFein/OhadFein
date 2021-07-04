import { Component, EventEmitter, Input, Output } from '@angular/core';

export class BackgroundProcess {
  type: BackgroundProcessType;
  processtId: string;
  data?: any;

  constructor(init?: Partial<BackgroundProcess>) {
    Object.assign(this, init);
  }
}

export enum BackgroundProcessType {
  UPLOAD_PRACTICE = 'uploadPractice'
}

export interface BackgroundProcessCallbackData {
  process: BackgroundProcess;
  action: BackgroundProcessCallbackAction;
}

export enum BackgroundProcessCallbackAction {
  CANCEL = 'cancel'
}

@Component({
  template: ''
})
export class BaseBgProcessComponent {
  @Input() process: BackgroundProcess;
  @Output() processCallback = new EventEmitter<BackgroundProcessCallbackData>();
}
