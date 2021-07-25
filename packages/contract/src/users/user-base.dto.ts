import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserBaseDto {
  constructor(slug: string, sub: string) {
    this.slug = slug;
    this.sub = sub;
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
