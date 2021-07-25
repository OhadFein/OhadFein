// import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStarDto {
  // @ApiProperty({ type: String })
  @IsString()
  promoVideo: string;

  // @ApiProperty({ type: String })
  @IsString()
  about: string;

  // @ApiProperty({ type: String })
  @IsString()
  logo: string;
}
