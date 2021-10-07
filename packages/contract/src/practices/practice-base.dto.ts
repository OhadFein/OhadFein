import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PracticeBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  user: Types.ObjectId;

  @Expose()
  figure: Types.ObjectId; // TODO: needed? (used for query all figure practices)

  @Expose()
  key: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly createdAt: Date;
}
