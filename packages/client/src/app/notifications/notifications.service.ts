import { Injectable } from '@angular/core';
import {INotifications} from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor() { }

    getNotifications(): INotifications[]{
        return [
            {
                sourceUsername: 'sourceUsername 1',
                performedActionUsername: 'performedActionUsername 1',
                type: 'type 1',
                createdAt: 'createdAt 1',
                updatedAt: 'updatedAt 1',
                isRead: false,
            },
            {
                sourceUsername: 'sourceUsername 2',
                performedActionUsername: 'performedActionUsername 2',
                type: 'type 2',
                createdAt: 'createdAt 2',
                updatedAt: 'updatedAt 2',
                isRead: false,
            },
            {
                sourceUsername: 'sourceUsername 3',
                performedActionUsername: 'performedActionUsername 3',
                type: 'type 3',
                createdAt: 'createdAt 3',
                updatedAt: 'updatedAt 3',
                isRead: false,
            },
            {
                sourceUsername: 'sourceUsername 4',
                performedActionUsername: 'performedActionUsername 4',
                type: 'type 4',
                createdAt: 'createdAt 4',
                updatedAt: 'updatedAt 4',
                isRead: true,
            },
            {
                sourceUsername: 'sourceUsername 5',
                performedActionUsername: 'performedActionUsername 5',
                type: 'type 5',
                createdAt: 'createdAt 5',
                updatedAt: 'updatedAt 5',
                isRead: true,
            },
            {
                sourceUsername: 'sourceUsername 6',
                performedActionUsername: 'performedActionUsername 6',
                type: 'type 6',
                createdAt: 'createdAt 6',
                updatedAt: 'updatedAt 6',
                isRead: true,
            },
        ];
    }

    setNotifications(): any{
        return true;
    }
}
