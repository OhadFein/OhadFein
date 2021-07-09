import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
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
  type: EnumNotificationType;

  @Expose()
  readonly createdAt: Date;
}
