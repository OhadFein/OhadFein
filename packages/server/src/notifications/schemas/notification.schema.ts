import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NotificationBaseDto, EnumNotificationType } from '@danskill/contract';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Notification implements NotificationBaseDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  sourceUser: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  performedActionUser: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true }) // TODO: ref?
  linkedId: Types.ObjectId;

  @Prop({ type: Boolean, required: true })
  isRead: boolean;

  @Prop({ type: EnumNotificationType, required: true })
  type: EnumNotificationType;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
