import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PrepareS3URL } from 'src/common/utils/prepare-url';
import { Types } from 'mongoose';
import {
  FigureVideoBaseDto,
  EnumVideoType,
  EnumShootingAngle,
  EnumVideoTypeValues,
  EnumShootingAngleValues
} from '@danskill/contract';

export type FigureVideoDocument = FigureVideo & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class FigureVideo implements FigureVideoBaseDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  stars: Types.ObjectId[]; // participants stars

  @Prop({ type: Types.ObjectId, ref: 'Figure', required: true })
  figure: Types.ObjectId;

  @Prop({ required: true })
  key: string;

  readonly url: string;

  @Prop({ required: true, get: PrepareS3URL })
  thumbnail: string;

  @Prop({ type: String, required: true, enum: EnumVideoTypeValues })
  type: EnumVideoType;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: String, required: true, enum: EnumShootingAngleValues })
  shooting_angle: EnumShootingAngle;
}

export const FigureVideoSchema = SchemaFactory.createForClass(FigureVideo);

FigureVideoSchema.virtual('url').get(function (this: { key: string }) {
  return PrepareS3URL(this.key);
});
