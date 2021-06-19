import { Types } from 'mongoose';
import { PracticeDto } from '../practices';
import { UserDto } from '../users';

export interface NoteDto {
  readonly _id: Types.ObjectId;
  user: Types.ObjectId | UserDto;
  practice: Types.ObjectId | PracticeDto;
  title: string;
  content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
