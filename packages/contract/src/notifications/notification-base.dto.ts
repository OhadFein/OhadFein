import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { EnumNotificationType } from '../common/enums';

@Exclude()
export class NotificationBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  linkedId: Types.ObjectId;

  @Expose()
  isRead: boolean;

  @Expose()
  readAt?: Date;

  @Expose()
  type: EnumNotificationType;

  @Expose()
  createdAt: Date;
}
