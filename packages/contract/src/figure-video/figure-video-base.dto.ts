import { Types } from 'mongoose';
import { Exclude, Expose, Type } from 'class-transformer';
import { EnumVideoType } from '../common/enums/video-type.enum';

@Exclude()
export class FigureVideoBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  key: string;

  @Expose()
  readonly url: string;

  @Expose()
  thumbnail: string;

  @Expose()
  type: EnumVideoType;

  @Expose()
  duration: number;

  @Expose()
  name: string;
}
