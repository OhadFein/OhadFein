import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Alert, ALERT_TIMEOUT, AlertType } from '@infra/core/models';
import { AlertService } from '@infra/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-alerts',
  templateUrl: './alerts.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(300%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('300ms ease-in-out', style({ transform: 'translateY(300%)' }))])
    ])
  ]
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() id: string;

  alerts: Alert[] = [];
  subscription: Subscription;

  constructor(private alertService: AlertService) {}
  ngOnInit() {
    this.subscription = this.alertService.onAlert(this.id).subscribe((alert) => {
      if (!alert.message) {
        // clear alerts when an empty alert is received
        this.alerts = [];

        return;
      }

      // add alert to array
      this.alerts.push(alert);
      setTimeout(() => {
        this.removeAlert(alert);
      }, ALERT_TIMEOUT);
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // remove specified alert from array
    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
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
