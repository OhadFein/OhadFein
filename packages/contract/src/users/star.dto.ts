import { FigureBaseDto } from '../figures';
import { UserBaseDto } from './user-base.dto'
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StarDto extends UserBaseDto {
  @Expose()
  figures: FigureBaseDto[];
  
  @Expose()
  promo_video: string;
  
  @Expose()
  about: string;
  
  @Expose()
  logo: string;
}
