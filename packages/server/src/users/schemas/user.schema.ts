/* eslint-disable max-classes-per-file */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EnumRole } from 'src/common/enums/role.enum';
import { PrepareS3URL } from 'src/common/utils/prepare-url';
import { StarDto, CoachDto, UserBaseDto, FigureBaseDto } from '@danskill/contract';
import { Figure } from '../../figures/schemas/figure.schema';
import { Practice } from '../../practices/schemas/practice.schema';
import { Notification } from '../../notifications/schemas/notification.schema';

export type UserDocument = User & Star & Coach & Document;

@Schema({ timestamps: true, toJSON: { getters: true } })
export class User implements UserBaseDto {
  _id: Types.ObjectId;

  // TODO: needed? should be used for AdminGetUser SDK function
  // @Prop({ required: true, unique: true })
  // username: string;

  @Prop({ required: true, unique: true })
  sub: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ default: [EnumRole.User] })
  roles: EnumRole[];

  @Prop({ type: Types.ObjectId, ref: User.name })
  coach?: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Practice' }], // TODO: Practice.name
  })
  practices: Types.ObjectId[] | Practice[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  notifications: Types.ObjectId[] | Notification[];

  // coach attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  students: Types.ObjectId[] | User[];

  // star attributes:
  @Prop({ type: [{ type: Types.ObjectId, ref: Figure.name }] })
  figures: Types.ObjectId[] | Figure[];

  @Prop({})
  about: string;

  @Prop({ get: PrepareS3URL })
  logo: string;

  @Prop({ get: PrepareS3URL })
  promoVideo: string;
}

export class Star extends User implements StarDto {
  figures: Figure[];

  promoVideo: string;

  about: string;

  logo: string;
}

export class Coach extends User implements CoachDto {
  students: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
