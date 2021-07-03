import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  sub: string;
}
