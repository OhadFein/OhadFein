import { Exclude, Expose, Type } from 'class-transformer';
import { FigureVideoDto } from '../figure-video';
import { PracticeBaseDto } from './practice-base.dto';
import { NoteBaseDto } from '../notes/note-base.dto';

@Exclude()
export class PracticeDto extends PracticeBaseDto {
  @Expose()
  @Type(() => FigureVideoDto)
  video: FigureVideoDto;

  @Expose()
  @Type(() => NoteBaseDto)
  notes?: NoteBaseDto[];
}
