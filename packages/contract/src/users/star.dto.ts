import { FigureBaseDto } from '../figures';
import { UserBaseDto } from './user-base.dto'
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class StarDto extends UserBaseDto {
  @Expose()
  @Type(() => FigureBaseDto)
  figures: FigureBaseDto[];
  
  @Expose()
  promo_video: string;
  
  @Expose()
  about: string;
  
  @Expose()
  logo: string;
}
