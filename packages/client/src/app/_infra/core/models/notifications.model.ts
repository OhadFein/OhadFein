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
}

export interface ISortedNotifications{
    date: string;
    notifications?: INotifications[];
}