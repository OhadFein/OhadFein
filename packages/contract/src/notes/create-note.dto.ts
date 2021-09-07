// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  // @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  // @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  content: string;
}
