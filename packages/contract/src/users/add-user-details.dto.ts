import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddUserDetailsDTO {
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

}
