import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '@app/notifications/notifications.service';
import { interval, merge, Subject, timer } from 'rxjs';
import {
  flatMap,
  map,
  takeLast,
  takeUntil,
  switchMap,
  mergeMap,
  mergeMapTo,
  concatMap,
  concatMapTo,
  mapTo
} from 'rxjs/operators';

@Component({
  selector: 'dsapp-notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss']
})
export class NotificationButtonComponent implements OnInit, OnDestroy {
  unreadNotificationsNumber: number;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    const timerSubscr = timer(0, 10000).pipe(
      takeUntil(this.unsubscribe),
      switchMap(() => {
        return this.notificationService.getUnreadNotificationsNumber();
      })
    );
    const valueChangeSubs = this.notificationService.unreadNotificationsNumObservable.pipe(
      takeUntil(this.unsubscribe)
    );
    merge(timerSubscr, valueChangeSubs).subscribe((unreadNotificationsNumber) => {
      this.unreadNotificationsNumber = unreadNotificationsNumber;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
