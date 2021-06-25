import { Types } from 'mongoose';
import { EnumDanceType, EnumDanceLevel } from '@danskill/contract';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { BaseUserDto } from '../users';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FigureDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  stars: Types.ObjectId[] | BaseUserDto[]; // TODO:

  @Expose()
  videos: FigureVideoDto[];

  @Expose()
  name: string;

  @Expose()
  logo: string;

  @Expose()
  type: EnumDanceType;

  @Expose()
  level: EnumDanceLevel;
}
