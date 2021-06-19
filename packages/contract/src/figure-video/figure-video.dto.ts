import { FigureDto } from './../figures/figure.dto';
import { UserDto } from './../users/user.dto';
import { Types } from 'mongoose';
import { EnumVideoType } from '@danskill/contract';

export interface FigureVideoDto {
  readonly _id: Types.ObjectId;
  stars: Types.ObjectId[] | UserDto[]; // participants stars
  figure: Types.ObjectId | FigureDto;
  key: string;
  readonly url: string;
  thumbnail: string;
  type: EnumVideoType;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
