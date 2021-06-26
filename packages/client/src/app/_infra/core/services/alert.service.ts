import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../models';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = true;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  // enable subscribing to alerts observable
  onAlert(alertId?: string): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  // convenience methods
  success(message: string, param?: string, alertId?: string, keepAfterRouteChange = true) {
    this.alert(new Alert({ message, param, type: AlertType.Success, alertId, keepAfterRouteChange }));
  }

  error(message: string, param?: string, alertId?: string, keepAfterRouteChange = true) {
    this.alert(new Alert({ message, param, type: AlertType.Error, alertId, keepAfterRouteChange }));
  }

  info(message: string, param?: string, alertId?: string, keepAfterRouteChange = true) {
    this.alert(new Alert({ message, param, type: AlertType.Info, alertId, keepAfterRouteChange }));
  }

  warn(message: string, param?: string, alertId?: string, keepAfterRouteChange = true) {
    this.alert(new Alert({ message, param, type: AlertType.Warning, alertId, keepAfterRouteChange }));
  }

  // main alert method
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }
}
