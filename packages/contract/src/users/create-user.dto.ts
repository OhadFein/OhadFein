import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, IsMongoId, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(username: string, sub: string) {
    this.username = username;
    this.sub = sub;
  }

  @ApiProperty({ type: String })
  @IsString()
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  sub: string;
}
