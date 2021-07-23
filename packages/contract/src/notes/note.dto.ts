import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from '../users';
import { PracticeBaseDto } from '../practices';
import { NoteBaseDto } from './note-base.dto';

@Exclude()
export class NoteDto extends NoteBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  user: UserBaseDto;

  @Expose()
  @Type(() => PracticeBaseDto)
  practice: PracticeBaseDto;
}
