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
    NEW_STAR_FIGURE = 'NEW STAR FIGURE',
    NEW_USER_NOTE = 'NEW STAR NOTE',
    NEW_COACH_NOTE = 'NEW COACH NOTE'
}

export interface ISortedNotifications{
    date: string;
    notifications?: INotifications[];
}