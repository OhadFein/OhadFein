import { Injectable } from '@angular/core';
import {INotifications, IRestResponse, UserRestResponse} from '@core/models';
import {map} from "rxjs/operators";
import {BaseRestService} from "@core/services";
import {Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private baseRestService: BaseRestService) { }

    getNotifications(): Observable<INotifications[]>{
        return this.baseRestService.get<IRestResponse>(`notifications`)
            .pipe(
                map((response: IRestResponse) => {
                    return response.data ? response.data : [];
                })
            );
    }
    // `stars/${starId}`

    setNotificationsAsRead(notificationId): any{
        return this.baseRestService.post<IRestResponse>(`notifications/mark/read/${notificationId}`).pipe(
            map(
                res => {
                    console.log("res", res)
                    if (res.success) {
                        return res.data;
                    } else {
                        throwError([res.message]); // TODO: add real error here
                    }
                },
                error => {
                    throwError(['ERRORS.GeneralBackendError']);
                }
            )
        )
    }
}


// return [
//     {
//         sourceUsername: 'sourceUsername 1',
//         performedActionUsername: 'performedActionUsername 1',
//         type: 'type 1',
//         createdAt: '2017-10-04T20:24:30+00:00',
//         updatedAt: 'updatedAt 1',
//         isRead: false,
//     },
//     {
//         sourceUsername: 'sourceUsername 2',
//         performedActionUsername: 'performedActionUsername 2',
//         type: 'type 2',
//         createdAt: '2017-10-04T12:35:30+00:00',
//         updatedAt: 'updatedAt 2',
//         isRead: false,
//     },
//     {
//         sourceUsername: 'sourceUsername 3',
//         performedActionUsername: 'performedActionUsername 3',
//         type: 'type 3',
//         createdAt: '2017-10-14T20:32:30+00:00',
//         updatedAt: 'updatedAt 3',
//         isRead: false,
//     },
//     {
//         sourceUsername: 'sourceUsername 4',
//         performedActionUsername: 'performedActionUsername 4',
//         type: 'type 4',
//         createdAt: '2017-10-04T10:12:30+00:00',
//         updatedAt: 'updatedAt 4',
//         isRead: true,
//     },
//     {
//         sourceUsername: 'sourceUsername 5',
//         performedActionUsername: 'performedActionUsername 5',
//         type: 'type 5',
//         createdAt: '2017-10-14T20:34:30+00:00',
//         updatedAt: 'updatedAt 5',
//         isRead: true,
//     },
//     {
//         sourceUsername: 'sourceUsername 6',
//         performedActionUsername: 'performedActionUsername 6',
//         type: 'type 6',
//         createdAt: '2021-05-04T12:34:30+00:00',
//         updatedAt: 'updatedAt 6',
//         isRead: true,
//     },
// ];