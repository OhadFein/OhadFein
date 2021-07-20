// import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  // TODO: constructor should be here?
  constructor(username: string, sub: string) {
    this.username = username;
    this.sub = sub;
  }

  // @ApiProperty({ type: String })
  @IsString()
  username: string;

  // @ApiProperty({ type: String })
  @IsString()
  sub: string;
}
