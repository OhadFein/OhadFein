import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  slug: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  readonly createdAt: Date;

  // @Expose() notifications: Notifcation[];
}
