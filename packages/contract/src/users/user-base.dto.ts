import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  sub: string;

  @Expose()
  slug: string;

  // @Expose() notifications: Notifcation[];
}
