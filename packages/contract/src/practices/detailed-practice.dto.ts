import { FigureVideoBaseDto } from '../figure-video/figure-video-base.dto';
import { PracticeBaseDto } from './practice-base.dto';
import { NoteBaseDto } from '../notes/note-base.dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class DetailedPracticeDto extends PracticeBaseDto  {
  @Expose()
  @Type(() => FigureVideoBaseDto)
  video: FigureVideoBaseDto;

  @Expose()
  @Type(() => NoteBaseDto)
  notes: NoteBaseDto[];
}
