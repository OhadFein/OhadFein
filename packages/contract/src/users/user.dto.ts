import { Exclude, Expose, Type } from 'class-transformer';
import { BaseUserDto } from './base-user.dto';

@Exclude()
export class UserDto extends BaseUserDto {
  @Expose()
  @Type(() => BaseUserDto)
  coach?: BaseUserDto;
}
