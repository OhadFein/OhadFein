import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  @IsString()
  title: string;

  @IsString()
  content: string;
}
