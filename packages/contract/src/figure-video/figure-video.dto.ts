import { Exclude, Expose, Type } from 'class-transformer';
import { FigureBaseDto } from '../figures/figure-base.dto';
import { FigureVideoBaseDto } from './figure-video-base.dto';

@Exclude()
export class FigureVideoDto extends FigureVideoBaseDto {
  @Expose()
  @Type(() => FigureBaseDto)
  figure: FigureBaseDto;
}
