import { Types } from 'mongoose';
import { EnumVideoType } from '../common/enums/video-type.enum';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class FigureVideoBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  stars: Types.ObjectId[]; // participants stars

  @Expose()
  figure: Types.ObjectId;

  @Expose()
  key: string;

  @Expose()
  readonly url: string;

  @Expose()
  thumbnail: string;

  @Expose()
  type: EnumVideoType;
}
