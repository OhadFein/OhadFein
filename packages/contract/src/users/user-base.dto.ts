import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseDto {
  constructor(slug: string, sub: string, firstName?: string, lastName?: string) {
    this.slug = slug;
    this.sub = sub;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
  }

  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  sub: string;

  @Expose()
  slug: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  // @Expose() notifications: Notifcation[];
}
