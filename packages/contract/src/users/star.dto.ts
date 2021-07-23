import { Exclude, Expose, Type } from 'class-transformer';
import { FigureBaseDto } from '../figures';
import { UserBaseDto } from './user-base.dto';

@Exclude()
export class StarDto extends UserBaseDto {
  @Expose()
  @Type(() => FigureBaseDto)
  figures: FigureBaseDto[];

  @Expose()
  promoVideo: string;

  @Expose()
  about: string;

  @Expose()
  logo: string;
}
