import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BackgroundProcessCallbackAction,
  BackgroundProcessCallbackData,
  BaseBgProcessComponent
} from '@app/_infra/core/models';
import * as PracticesActions from '@app/_infra/store/actions/practices.actions';
import { PracticesService } from '@core/services';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-upload-practice-bg-process',
  templateUrl: './upload-practice-bg-process.component.html'
})
export class UploadPracticeBgProcessComponent extends BaseBgProcessComponent
  implements OnInit, OnDestroy {
  httpSub: Subscription;
  isError = false;
  message = '';
  progress = 0;

  constructor(private practicesService: PracticesService, private store: Store<any>) {
    super();
  }

  ngOnInit() {
    this.subscribe();
  }

  retry(): void {
    this.isError = false;
    this.subscribe();
  }
  cancel(): void {
    const data: BackgroundProcessCallbackData = {
      process: this.process,
      action: BackgroundProcessCallbackAction.CANCEL
    };
    this.processCallback.emit(data);
  }

  subscribe(): void {
    this.httpSub = this.practicesService.uploadPractice(this.process.data).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.message = 'LAB.MESSAGES.uploadStarted';
            setTimeout(() => {
              this.message = '';
            }, 3000);
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            break;
          case HttpEventType.Response:
            this.message = 'LAB.MESSAGES.uploadCompleted';
            setTimeout(() => {
              this.store.dispatch(PracticesActions.BeginGetPracticesAction());
              this.cancel();
            }, 4000);
        }
      },
      () => {
        this.isError = true;
        this.unsubscribe();
      }
    );
  }

  unsubscribe(): void {
    if (this.httpSub) {
      this.httpSub.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
