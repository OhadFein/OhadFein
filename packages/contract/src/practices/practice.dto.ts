import { Exclude, Expose, Type } from 'class-transformer';
import { FigureVideoBaseDto } from '../figure-video/figure-video-base.dto';
import { PracticeBaseDto } from './practice-base.dto';
import { NoteBaseDto } from '../notes/note-base.dto';

@Exclude()
export class PracticeDto extends PracticeBaseDto {
  @Expose()
  @Type(() => FigureVideoBaseDto)
  video: FigureVideoBaseDto;

  @Expose()
  @Type(() => NoteBaseDto)
  notes: NoteBaseDto[];
}
