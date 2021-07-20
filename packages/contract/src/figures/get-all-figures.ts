// import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetAllFiguresDto {
  // @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly starUsername?: string;
}
