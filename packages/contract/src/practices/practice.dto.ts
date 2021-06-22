import { Types } from 'mongoose';
import { FigureDto } from '../figures/figure.dto';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { NoteDto } from '../notes/note.dto';

// TODO: add Expose and Exclude
export class PracticeDto {
  readonly _id: Types.ObjectId;
  user: Types.ObjectId;
  figure: Types.ObjectId; // TODO: used for query all figure practices
  video: Types.ObjectId | FigureVideoDto;
  notes: Types.ObjectId[] | NoteDto[];
  key: string;
  readonly url: string;
  readonly createdAt: Date;
}
