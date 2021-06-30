import { Types } from 'mongoose';
import { EnumDanceType, EnumDanceLevel } from '@danskill/contract';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FigureBaseDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  logo: string;

  @Expose()
  type: EnumDanceType;

  @Expose()
  level: EnumDanceLevel;
}
