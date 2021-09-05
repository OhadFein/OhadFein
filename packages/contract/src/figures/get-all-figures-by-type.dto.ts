import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllFiguresByTypeDto {
  @IsNotEmpty()
  @IsString()
  readonly starUsername: string;

  @IsNotEmpty()
  @IsString()
  readonly figureType: string;
}
