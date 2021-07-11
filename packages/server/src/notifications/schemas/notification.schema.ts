/* eslint-disable max-classes-per-file */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumNotificationType, NotificationBaseDto } from '@danskill/contract';
import {
  EnumNotificationLinkedModel,
  possibleNotificationLinkedModels,
} from 'src/common/enums/notification-linked-model.enum';

@Schema()
export class ReadBy {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  readerId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  readAt: Date;
}
const ReadBySchema = SchemaFactory.createForClass(ReadBy);

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification implements NotificationBaseDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // TODO: change to User.name
  senders: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // TODO: change to User.name
  receivers: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, required: true, refPath: 'notificationLinkedModel' })
  linkedId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: possibleNotificationLinkedModels })
  notificationLinkedModel: EnumNotificationLinkedModel;

  @Prop({ type: [ReadBySchema] })
  readBy: ReadBy[];

  isRead: boolean;

  readAt?: Date;

  @Prop({ type: EnumNotificationType, required: true })
  type: EnumNotificationType;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
