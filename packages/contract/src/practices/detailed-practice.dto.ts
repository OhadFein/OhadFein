import { PracticeDto } from './practice.dto';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { NoteDto } from '../notes/note.dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class DetailedPracticeDto extends PracticeDto  {
  @Expose()
  @Type(() => FigureVideoDto)
  video: FigureVideoDto;

  @Expose()
  @Type(() => NoteDto)
  notes: NoteDto[];
}
