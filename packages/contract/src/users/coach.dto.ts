import { BaseUserDto } from './base-user.dto'
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CoachDto extends BaseUserDto {
  @Expose()
  students: BaseUserDto[];
}
