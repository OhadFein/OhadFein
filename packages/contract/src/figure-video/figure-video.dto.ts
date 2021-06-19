import { FigureDto } from './../figures/figure.dto';
import { UserDto } from './../users/user.dto';
import { Types } from 'mongoose';
import { EnumVideoType } from '@danskill/contract';
import { User } from 'src/users/schemas/user.schema';
import { Figure } from 'src/figures/schemas/figure.schema';

export interface FigureVideoDto {
  readonly _id: Types.ObjectId;
  stars: Types.ObjectId[] | User[]; // participants stars
  figure: Types.ObjectId | Figure;
  key: string;
  readonly url: string;
  thumbnail: string;
  type: EnumVideoType;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
