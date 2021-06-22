import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { User } from 'src/users/schemas/user.schema';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import { FigureDto, EnumDanceType, EnumDanceLevel } from '@danskill/contract';

export type FigureDocument = Figure & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Figure implements FigureDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // TODO: change to User.name
  stars: User[] | Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: FigureVideo.name }] })
  videos: FigureVideo[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, get: PrepareUrl })
  logo: string;

  @Prop({ required: true })
  type: EnumDanceType;

  @Prop({ required: true })
  level: EnumDanceLevel;
}

export const FigureSchema = SchemaFactory.createForClass(Figure);
