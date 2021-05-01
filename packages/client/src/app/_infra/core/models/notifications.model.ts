export interface INotifications {
    sourceUsername: string;
    performedActionUsername: string;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
    isRead: boolean;
}

export interface ISortedNotifications{
    date: string;
    notifications?: INotifications[];
}