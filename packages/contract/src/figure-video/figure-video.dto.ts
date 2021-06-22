import { Types } from 'mongoose';
import { EnumVideoType } from '@danskill/contract';

// TODO: add Expose and Exclude
export class FigureVideoDto {
  readonly _id: Types.ObjectId;
  stars: Types.ObjectId[]; // participants stars
  figure: Types.ObjectId;
  key: string;
  readonly url: string;
  thumbnail: string;
  type: EnumVideoType;
}
