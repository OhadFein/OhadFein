import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';

export class CreateUserDto {

  constructor(firstName: string, lastName: string, sub: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.sub = sub;
  }
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  sub: string;
}
