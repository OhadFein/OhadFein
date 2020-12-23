import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { jwtAccessPrivateKey, jwtRefreshPrivateKey, signOptionsAccessToken, signOptionsRefreshToken } from '../config/jwt';
import { EnumAgeGroup, EnumGender, EnumLanguage, possibleGenders, possibleLanguages, EnumRole, possibleRoles } from '../shared/enums';
import { IPracticeItem } from './PracticeItem';
import User from './User';
import { NextFunction } from 'express';


interface tokenData {
  refresh_token: string
  access_token: string
  expired_at: Date
}

export interface dataStoredInToken {
  _id: string;
}

interface BirthDate {
  date?: Date;
  group?: EnumAgeGroup;
}

export interface Name {
  firstName: string;
  lastName: string;
  nickname?: string;
}

interface IProfile {
  gender?: EnumGender,
  language: EnumLanguage,
  birthDate?: BirthDate,
  name: Name,
  about?: string
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: EnumRole, enum: possibleRoles, default: EnumRole.user },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Number },
    emailVerificationToken: { type: String },
    emailVerified: { type: Boolean, default: false },

    // TODO: this properties are needed?
    // facebook: String,
    // google: String,
    // tokens: [{ type: String }],

    practiceItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PracticeItem' }],

    profile: {
      gender: { type: EnumGender, enum: possibleGenders }, // TODO: required: true?
      language: { type: EnumLanguage, enum: possibleLanguages, required: true, default: EnumLanguage.english },
      birthDate: {
        date: { type: Date },
      },
      name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        nickname: { type: String },
      },
      about: { type: String },
    }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  virtuals: true
});

const getAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

userSchema.virtual('profile.birthDate.group').get(function (this: { profile: IProfile }) {
  let age, group;
  if (this.profile && this.profile.birthDate && this.profile.birthDate.date) {
    age = getAge(this.profile.birthDate.date);

    switch (true) {
      case (age < 12):
        group = EnumAgeGroup.CHILD;
        break;
      case (age < 18):
        group = EnumAgeGroup.YOUNG;
        break;
      default:
        group = EnumAgeGroup.ADULT;
        break;
    }
  }

  return group;
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
interface IUserSchema extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: EnumRole;
  passwordResetToken: string;
  passwordResetExpires: number;
  emailVerificationToken: string;
  emailVerified: boolean;

  facebook: string;
  google: string;
  tokens: Types.Array<string>;

  profile: IProfile;
}

interface IUserBase extends IUserSchema {
  generateAuthToken(): Promise<tokenData>;
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

export interface IUser extends IUserBase {
  practiceItems: [IPracticeItem["_id"]];
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