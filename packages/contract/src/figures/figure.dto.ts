import { BaseUserDto } from './../users/base-user.dto';
import { FigureVideoBaseDto } from '@danskill/contract';
import { FigureBaseDto } from './figure-base.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FigureDto extends FigureBaseDto {
  @Expose()
  stars: BaseUserDto[];

  @Expose()
  videos: FigureVideoBaseDto[];
}
