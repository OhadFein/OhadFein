import { UserBaseDto, PracticeBaseDto } from '@danskill/contract';
import { Exclude, Expose, Type } from 'class-transformer';
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
