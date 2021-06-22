import { Types } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class BaseUserDto {
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

  // @Expose() students?: User[]; // TODO: fix students
  // @Expose() notifications: Notifcation[];
}
