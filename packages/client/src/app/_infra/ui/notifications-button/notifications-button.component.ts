import { TokenService } from '@core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '@app/notifications/notifications.service';
import { merge, Subject, timer } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dsapp-notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss']
})
export class NotificationButtonComponent implements OnInit, OnDestroy {
  unreadNotificationsNumber: number;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private notificationService: NotificationsService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const timerSubscr = timer(0, 10000).pipe(
      takeUntil(this.unsubscribe),
      flatMap(() => {
        if (this.tokenService.checkStoredAccessToken) {
          return this.notificationService.getUnreadNotificationsNumber();
        }
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
