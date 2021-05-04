import { IUser } from './User';
import mongoose, { Document, Model, model } from 'mongoose';
import { possibleNotifications, EnumNotificationType } from '../shared/enums';

const notificationSchema = new mongoose.Schema(
    {
        sourceUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        performedActionUser: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }],
        linkedId: { type: mongoose.Schema.Types.ObjectId, required: true }, // TODO: ref?
        isRead: { type: Boolean, default: false },
        type: { type: EnumNotificationType, enum: possibleNotifications, required: true },
    },
    { timestamps: true }
);

interface INotificationSchema extends Document {
    _id: mongoose.Types.ObjectId;
    linkedId: mongoose.Types.ObjectId;
    isRead: Boolean;
    type: EnumNotificationType;
}

interface INotificationBase extends INotificationSchema {
    // Virtuals and instance methods - should be here
}

export interface INotification extends INotificationBase {
    sourceUser: IUser["_id"];
    performedActionUser: [IUser["_id"]];
}

export interface INotificationModel extends Model<INotification> {
}

export default model<INotification, INotificationModel>('Notification', notificationSchema);
