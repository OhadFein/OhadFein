import { Practice } from './../../practices/schemas/practice.schema';
import { Figure } from './../../figures/schemas/figure.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumRole } from 'src/common/enums/role.enum';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { StarDto, CoachDto, BaseUserDto } from '@danskill/contract';

export type UserDocument = User & Star & Coach & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class User implements BaseUserDto {
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
  coach?: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Practice.name }],
  })
  practices: Types.ObjectId[] | Practice[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifcation' }] })
  // notifications: Notification[];

  // coach attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  students: Types.ObjectId[] | User[];

  // star attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: Figure.name }] })
  figures: Types.ObjectId[] | Figure[];

  @Prop({ })
  about: string;

  @Prop({ get: PrepareUrl })
  logo: string;

  @Prop({ get: PrepareUrl })
  promo_video: string;
}

export class Star extends User implements StarDto {
  figures: Figure[];
  promo_video: string;
  about: string;
  logo: string;
}

export class Coach extends User implements CoachDto {
  students: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
