import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from './user-base.dto';

@Exclude()
export class UserDto extends UserBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  coach?: UserBaseDto;
}
