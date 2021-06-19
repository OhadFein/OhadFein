import { Practice } from './../../practices/schemas/practice.schema';
import { Figure } from './../../figures/schemas/figure.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumRole } from 'src/common/enums/role.enum';
import { PrepareUrl } from 'src/common/utils/prepare-url';
import { UserDto } from '@danskill/contract';

export type UserDocument = User & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class User implements UserDto {
  _id: Types.ObjectId;

  @Prop({ required: true, select: false, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: [EnumRole.User], select: false })
  roles: EnumRole[];

  @Prop({ required: true })
  given_name: string;

  @Prop({ required: true })
  family_name: string;

  @Prop()
  birthdate?: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  coach?: User;

  // @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  // students?: User[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: Practice.name }],
  })
  practices: Practice[] | Types.ObjectId[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifcation' }] })
  // notifications: Notification[];

  // star attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: Figure.name }] })
  figures?: Figure[] | Types.ObjectId[];

  @Prop({})
  about?: string;

  @Prop({ get: PrepareUrl })
  logo?: string;

  @Prop({ get: PrepareUrl })
  promo_video?: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
