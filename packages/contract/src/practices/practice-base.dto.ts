import { Types } from 'mongoose';
import { NoteBaseDto } from '../notes/note-base.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PracticeBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  user: Types.ObjectId; // TODO: needed?

  @Expose()
  figure: Types.ObjectId; // TODO: needed? (used for query all figure practices)

  @Expose()
  key: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly createdAt: Date;
}
