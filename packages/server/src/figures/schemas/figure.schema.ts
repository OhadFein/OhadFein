import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PrepareS3URL } from 'src/common/utils/prepare-url';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import { FigureBaseDto, EnumDanceType, EnumDanceLevel } from '@danskill/contract';

export type FigureDocument = Figure & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class Figure implements FigureBaseDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // TODO: change to User.name
  stars: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: FigureVideo.name }] })
  videos: Types.ObjectId[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, get: PrepareS3URL })
  logo: string;

  @Prop({ required: true })
  type: EnumDanceType;

  @Prop({ required: true })
  level: EnumDanceLevel;
}

export const FigureSchema = SchemaFactory.createForClass(Figure);
