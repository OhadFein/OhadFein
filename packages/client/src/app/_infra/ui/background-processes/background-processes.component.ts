import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BackgroundProcess,
  BackgroundProcessCallbackAction,
  BackgroundProcessCallbackData
} from '@core/models';
import { BackgroundProcessesService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-background-processes',
  templateUrl: './background-processes.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class BackgroundProcessesComponent implements OnInit, OnDestroy {
  processes: BackgroundProcess[] = [];
  subscription: Subscription;

  constructor(private backgroundProcessesService: BackgroundProcessesService) {}

  ngOnInit() {
    this.subscription = this.backgroundProcessesService
      .onBackgroundProcess()
      .subscribe((process) => {
        const check = this.processes.some((obj) => obj.processtId === process.processtId);
        if (!check) {
          this.processes.push(process);
        }
      });
  }

  handleProcessCallback(data: BackgroundProcessCallbackData) {
    switch (data.action) {
      case BackgroundProcessCallbackAction.CANCEL:
        this.removeProcess(data.process);
        break;
    }
  }

  removeProcess(process: BackgroundProcess) {
    // remove specified alert from array
    this.processes = this.processes.filter((x) => x !== process);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
