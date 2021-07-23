import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NoteBaseDto } from '@danskill/contract';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note implements NoteBaseDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Practice', required: true }) // TODO: change to Practice.name
  practice: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
