// import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(slug: string, sub: string, email: string, firstName?: string, lastName?: string) {
    this.slug = slug;
    this.sub = sub;
    this.email = email;
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
  }

  // @ApiProperty({ type: String })
  @IsString()
  slug: string;

  // @ApiProperty({ type: String })
  @IsString()
  sub: string;

  // @ApiProperty({ type: String })
  @IsString()
  email: string;

  // @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  firstName?: string;

  // @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  lastName?: string;
}
