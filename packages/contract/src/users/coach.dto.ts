import { UserBaseDto } from './user-base.dto'
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class CoachDto extends UserBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  students: UserBaseDto[];
}
