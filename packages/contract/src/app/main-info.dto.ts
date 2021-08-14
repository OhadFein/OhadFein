import { Exclude, Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { EnumRole } from '../../../server/src/common/enums/role.enum';

@Exclude()
export class MainInfoDto {
  @Expose()
  roles: EnumRole[];

  @Expose()
  notifications: Types.ObjectId[];

  @Expose()
  unreadNotificationsCounter: number;
}
