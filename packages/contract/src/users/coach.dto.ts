import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from './user-base.dto';

@Exclude()
export class CoachDto extends UserBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  students: UserBaseDto[];
}
