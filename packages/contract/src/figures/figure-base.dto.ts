import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import { EnumDanceType, EnumDanceLevel } from '../common/enums';

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
