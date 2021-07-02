import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;
  
  @Expose()
  username: string;

  @Expose()
  given_name: string;

  @Expose()
  family_name: string;

  @Expose()
  birthdate?: Date;

  // @Expose() notifications: Notifcation[];
}
