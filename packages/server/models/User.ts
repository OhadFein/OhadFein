import { INotification } from './Notification';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Model, model, Schema, Types } from 'mongoose';
import { jwtAccessPrivateKey, jwtRefreshPrivateKey, signOptionsAccessToken, signOptionsRefreshToken } from '../config/jwt';
import { EnumGender, EnumLanguage, possibleGenders, possibleLanguages, EnumRole, possibleRoles } from '../shared/enums';
import { IPractice } from './Practice';
import User from './User';
import { NextFunction } from 'express';
import { IFigure } from './Figure';

interface tokenData {
  refresh_token: string;
  access_token: string;
  expired_at: Date;
}

interface IStar {
  figures: [IFigure];
  description: string;
  logo: string;
  promo_video: string;
}


export interface dataStoredInToken {
  _id: string;
}

export function concatAWSBucketPath(str: any) {
  return process.env.AWS_BUCKET_PATH + str;
}

const starSchema = new Schema(
  {
    figures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Figure" }],
    description: { type: String },
    logo: { type: String, get: concatAWSBucketPath },
    promo_video: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    // open id parameters:
    email: { type: String, unique: true, select: false },
    username: { type: String, required: true, unique: true, lowercase: true }, // TODO: a-z A-Z 0-9 .  mabye - _ too
    password: { type: String, required: true, select: false },
    roles: {
      type: [{ type: String, enum: possibleRoles }],
      default: [EnumRole.user],
      select: false,
    },

    password_reset_token: { type: String, select: false },
    password_reset_expires: { type: Number, select: false },
    email_verification_token: { type: String, select: false },
    email_verified: { type: Boolean, default: false, select: false },

    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    picture: { type: String, },
    birthdate: { type: Date },
    gender: { type: EnumGender, enum: possibleGenders },
    // TODO: should be changed to Enumlocale instead of language according to open id protocol)
    locale: { type: EnumLanguage, enum: possibleLanguages, required: true, default: EnumLanguage.english, select: false },

    about: { type: String },

    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    students: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      select: false
    },

    practices: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Practice' }],
      select: false
    },

    notifications: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notifcation' }],
      select: false
    },

    star: { type: starSchema, select: false, default: () => ({}) }

  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  virtuals: true,
  getters: true
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(this: IUser, next: NextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    return next();
  } catch (e) {
    return next(e);
  }
});

/**
 * Helper method for validating user's password.
 */
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  generateAuthToken(): Promise<tokenData>;

  email: string;
  username: string;
  password: string;
  roles: [EnumRole];

  password_reset_token: string;
  password_reset_expires: number;
  email_verification_token: string;
  email_verified: boolean;

  given_name: string;
  family_name: string;
  picture: string;
  birthdate: Date;
  gender: EnumGender;
  locale: EnumLanguage;

  about?: string;

  practices: [IPractice["_id"]];
  notifications: [INotification["_id"]];

  star: IStar;
  coach: IUser;
  students: [IUser["_id"]];
}

userSchema.methods.generateAuthToken = function (this: IUser): tokenData {
  const accessToken = jwt.sign({ _id: this._id }, jwtAccessPrivateKey, signOptionsAccessToken);
  const refreshToken = jwt.sign({ _id: this._id }, jwtRefreshPrivateKey, signOptionsRefreshToken);

  return {
    "access_token": accessToken,
    "refresh_token": refreshToken,
    "expired_at": new Date(Date.now() + (15 * 60 * 1000)) // TODO: 15m
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
userSchema.statics.findByCredentials = async (email: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ email: email }).select("+password").exec()
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(user_name: string, password: string): Promise<IUser>;
}

export default model<IUser, IUserModel>('User', userSchema);