import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from '../users/user-base.dto';
import { NotificationBaseDto } from './notification-base.dto';

@Exclude()
export class NotificationDto extends NotificationBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  senders: UserBaseDto[];
}
