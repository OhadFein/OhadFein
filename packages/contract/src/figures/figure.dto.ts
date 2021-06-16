import { Types } from 'mongoose';
import { EnumDanceType, EnumDanceLevel } from '@danskill/contract';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { UserDto } from '../users';

export interface FigureDto {
  readonly _id: Types.ObjectId;
  stars: Types.ObjectId[] | UserDto[];
  videos: Types.ObjectId[] | FigureVideoDto[];
  name: string;
  logo: string;
  type: EnumDanceType;
  level: EnumDanceLevel;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
