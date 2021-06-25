import { Practice } from './../../practices/schemas/practice.schema';
import { Figure } from './../../figures/schemas/figure.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumRole } from 'src/common/enums/role.enum';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { StarDto, CoachDto, UserBaseDto, FigureBaseDto } from '@danskill/contract';

export type UserDocument = User & Star & Coach & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class User implements UserBaseDto {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [EnumRole.User] })
  roles: EnumRole[];

  @Prop({ required: true })
  given_name: string;

  @Prop({ required: true })
  family_name: string;

  @Prop()
  birthdate?: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  coach?: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Practice.name }],
  })
  practices: Types.ObjectId[] | Practice[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifcation' }] })
  // notifications: Notification[];

  // coach attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  students: Types.ObjectId[] | UserBaseDto[];

  // star attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: Figure.name }] })
  figures: Types.ObjectId[] | FigureBaseDto[];

  @Prop({ })
  about: string;

  @Prop({ get: PrepareUrl })
  logo: string;

  @Prop({ get: PrepareUrl })
  promo_video: string;
}

export class Star extends User implements StarDto {
  figures: FigureBaseDto[];
  promo_video: string;
  about: string;
  logo: string;
}

export class Coach extends User implements CoachDto {
  students: UserBaseDto[];
}

export const UserSchema = SchemaFactory.createForClass(User);
