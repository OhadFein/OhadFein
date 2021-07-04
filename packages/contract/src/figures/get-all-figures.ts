import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAllFiguresDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly starUsername?: string;
}
