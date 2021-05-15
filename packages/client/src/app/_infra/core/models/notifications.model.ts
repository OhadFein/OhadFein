import {IUser} from '@models/star.model';

export interface INotifications {
    sourceUser: string;
    performedActionUsername: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    isRead: boolean;
    linkedId: string;
    performedActionUser: IUser[];
    _id: string;
}

export enum ENotificationType {
    NEW_STAR_FIGURE = 'new star figure',
    NEW_USER_NOTE = 'new star note',
    NEW_COACH_NOTE = 'new coach note'
}

export interface ISortedNotifications{
    date: string;
    notifications?: INotifications[];
}