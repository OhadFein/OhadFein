import { FigureDto } from '../figures';
import { BaseUserDto } from './base-user.dto'
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StarDto extends BaseUserDto {
  @Expose()
  figures: FigureDto[];
  
  @Expose()
  promo_video: string;
  
  @Expose()
  about: string;
  
  @Expose()
  logo: string;
}
