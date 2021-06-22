import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { User } from 'src/users/schemas/user.schema';
import { Types } from 'mongoose';
import { Figure } from 'src/figures/schemas/figure.schema';
import { FigureVideoDto, EnumVideoType } from '@danskill/contract';


export type FigureVideoDocument = FigureVideo & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class FigureVideo implements FigureVideoDto {
  readonly _id: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  stars: Types.ObjectId[]; // participants stars

  @Prop({ type: Types.ObjectId, ref: 'Figure', required: true })
  figure: Types.ObjectId;

  @Prop({ required: true })
  key: string;
  readonly url: string;

  @Prop({ required: true, get: PrepareUrl })
  thumbnail: string;

  @Prop({ required: true })
  type: EnumVideoType;
}

export const FigureVideoSchema = SchemaFactory.createForClass(FigureVideo);

FigureVideoSchema.virtual('url').get(function (this: { key: string }) {
  return PrepareUrl(this.key);
});
