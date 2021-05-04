import {Component, OnInit} from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {INotifications, ISortedNotifications} from '@core/models';
import * as selectors from '@store/selectors/notifications.selectors';
import * as NotificationsActions from '@store/actions/notifications.actions';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {not} from "rxjs/internal-compatibility";

@Component({
    selector: 'dsapp-notifications-page',
    templateUrl: './notifications-page.component.html',
    styleUrls: ['./notifications-page.scss']
})
export class NotificationsPageComponent implements OnInit {

    public notifications: INotifications[] = [];
    public sortedNotifications: ISortedNotifications[];
    public today: Date = new Date();
    subs: Subscription[] = [];

    constructor(private notificationsService: NotificationsService, private store: Store<any>) {
    }

    ngOnInit(): void {
        this.getNotifications();
        // this.sortNotifications();
    }

    sortNotifications(): void {
        const notificationGroups = this.notifications.reduce((groups, notification) => {
            const date = notification.createdAt.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push({
                sourceUser: notification.sourceUser,
                performedActionUsername: notification.performedActionUsername,
                type: notification.type,
                createdAt: new Date(notification.createdAt),
                isRead: notification.isRead
            });
            return groups;
        }, {});

        this.sortedNotifications = Object.keys(notificationGroups).map((date) => {
            return {
                date,
                notifications: notificationGroups[date]
            };
        }).sort((a, b) => {
            return new Date(b.date) as any - (new Date(a.date) as any);
        });
    }

    getNotifications(): void {
        this.subs.push(
            this.store.select(selectors.selectAllNotifications()).subscribe(
                notifications => {
                    if (notifications) {
                        this.notifications = notifications;
                        this.sortNotifications();
                    } else {
                        this.store.dispatch(NotificationsActions.BeginGetNotificationsAction());
                    }
                }))
    }

    setNotifications(): any {
        this.notificationsService.setNotifications()
    }

}
