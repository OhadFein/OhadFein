import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PracticeBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  user: Types.ObjectId;

  @Expose()
  key: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly createdAt: Date;
}
