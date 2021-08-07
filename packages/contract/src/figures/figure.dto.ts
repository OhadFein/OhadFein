import { Exclude, Expose, Type } from 'class-transformer';
import { UserBaseDto } from '../users/user-base.dto';
import { FigureBaseDto } from './figure-base.dto';
import { FigureVideoBaseDto } from '../figure-video';

@Exclude()
export class FigureDto extends FigureBaseDto {
  @Expose()
  @Type(() => UserBaseDto)
  stars: UserBaseDto[];

  @Expose()
  @Type(() => FigureVideoBaseDto)
  videos: FigureVideoBaseDto[];
}
