import { UserBaseDto } from './user-base.dto'
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CoachDto extends UserBaseDto {
  @Expose()
  students: UserBaseDto[];
}
