import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';

export class CreateUserDto {

  constructor(username: string, sub: string) {
    this.username = username;
    this.sub = sub;
  }

  @IsString()
  username: string;

  @IsString()
  sub: string;
}
