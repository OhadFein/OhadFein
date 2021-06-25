import { Types } from 'mongoose';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { NoteDto } from '../notes/note.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PracticeDto {
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
