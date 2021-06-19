import { Types } from 'mongoose';
import { UserDto } from '../users';
import { FigureDto } from '../figures/figure.dto';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { NoteDto } from '../notes/note.dto';

export interface PracticeDto {
  readonly _id: Types.ObjectId;
  user: Types.ObjectId | UserDto;
  figure: Types.ObjectId | FigureDto; // TODO: used for query all figure practices
  video: Types.ObjectId | FigureVideoDto;
  notes: Types.ObjectId[] | NoteDto[];
  key: string;
  readonly url: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
