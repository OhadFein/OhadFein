// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  // @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  // @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  content: string;
}
