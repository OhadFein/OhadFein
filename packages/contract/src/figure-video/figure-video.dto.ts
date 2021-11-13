import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from '../users/user-base.dto';
import { FigureBaseDto } from '../figures/figure-base.dto';
import { FigureVideoBaseDto } from './figure-video-base.dto';

@Exclude()
export class FigureVideoDto extends FigureVideoBaseDto {
  @Expose()
  @Type(() => FigureBaseDto)
  figure: FigureBaseDto;

  @Expose()
  @Type(() => UserBaseDto)
  stars: UserBaseDto;
}
