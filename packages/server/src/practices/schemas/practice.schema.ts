import { User } from 'src/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { Figure } from 'src/figures/schemas/figure.schema';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import { Note } from 'src/notes/schemas/note.schema';
import { PracticeDto } from '@danskill/contract/lib/practices/practice.dto'

export type PracticeDocument = Practice & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Practice implements PracticeDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // TODO: change to User.name
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Figure', required: true }) // TODO: change to Figure.name
  figure: Figure;

  @Prop({ type: Types.ObjectId, ref: FigureVideo.name, required: true })
  video: FigureVideo;

  @Prop({ required: true })
  key: string;
  readonly url: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Note.name }] })
  notes: Note[];

  readonly createdAt: Date;
  readonly updatedAt: Date;

  // @Prop({ required: true, get: PrepareUrl })
  // thumbnail: string;

  // @Prop()
  // name?: string;
}

export const PracticeSchema = SchemaFactory.createForClass(Practice);

PracticeSchema.virtual('url').get(function (this: { key: string }) {
  return PrepareUrl(this.key);
});
