import { Types } from 'mongoose';
import { EnumDanceType, EnumDanceLevel } from '@danskill/contract';
import { FigureVideoDto } from '../figure-video/figure-video.dto';
import { BaseUserDto } from '../users';

// TODO: add Expose and Exclude
export class FigureDto {
  readonly _id: Types.ObjectId;
  stars: Types.ObjectId[] | BaseUserDto[]; // TODO:
  videos: FigureVideoDto[];
  name: string;
  logo: string;
  type: EnumDanceType;
  level: EnumDanceLevel;
}
