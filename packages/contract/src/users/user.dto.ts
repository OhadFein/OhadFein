import { Types } from 'mongoose';
import { FigureDto } from '../figures';
import { PracticeDto } from '../practices';

export interface UserDto {
  readonly _id: Types.ObjectId;
  username: string;
  given_name: string;
  family_name: string;
  birthdate?: Date;
  coach?: Types.ObjectId | UserDto;
  practices: Types.ObjectId[] | PracticeDto[];

  // Star attributes
  figures?: Types.ObjectId[] | FigureDto[];
  promo_video?: string;
  about?: string;
  logo?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  // @Expose() students?: User[]; // TODO: fix students
  // @Expose() notifications: Notifcation[];
}
