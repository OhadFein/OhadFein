import { Types } from 'mongoose';
import { EnumVideoType } from '@danskill/contract';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class FigureVideoDto {
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
