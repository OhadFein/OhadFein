import { Types } from 'mongoose';
import { EnumVideoType } from '@danskill/contract';
import { Figure } from 'src/figures/schemas/figure.schema';
import { User } from 'src/users/schemas/user.schema';

export interface FigureVideoDto {
  readonly _id: Types.ObjectId;
  users: Types.ObjectId[] | User[]; // participants users
  figure: Types.ObjectId | Figure;
  key: string;
  readonly url: string;
  thumbnail: string;
  type: EnumVideoType;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
