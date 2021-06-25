import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NoteBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
