import { Types } from 'mongoose';

// TODO: add Expose and Exclude
export class NoteDto {
  readonly _id: Types.ObjectId;
  user: Types.ObjectId;
  practice: Types.ObjectId;
  title: string;
  content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
