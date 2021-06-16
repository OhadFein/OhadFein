import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Practice } from 'src/practices/schemas/practice.schema';
import { User } from 'src/users/schemas/user.schema';
import { NoteDto } from '@danskill/contract';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note implements NoteDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Practice', required: true }) // TODO: change to Practice.name
  practice: Practice;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
