import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  given_name: string;

  @IsString()
  family_name: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;

  @IsOptional()
  @IsMongoId()
  coach?: Types.ObjectId;
}
