import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from './language.model';
import { IStar } from './star.model';

export interface IUser {
  birthdate: Date;
  createdAt: Date;
  family_name: string;
  given_name: string;
  id: string;
  star: IStar;
  updatedAt: Date;
  username: string;
  about?: string;
  _id: string;
}

export interface IName {
  firstName: string;
  lastName: string;
  nickname?: string;
}

export class UserRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  name: IName;
  birthDate?: string;
}

export class UserLoginData {
  token: string;
  user: User;
}

export class User {
  id: string;
  email: string;
  profile: UserProfile;
}

export class UserProfile {
  name: IName;
  language: Language = Language.english;
  permissions?: UserPermissions[];
  gender?: Gender | '';
  location?: Location;
  birthDate?: BirthDate;
  picture?: string = null;
  about?: string;
}

export enum UserPermissions {
  USER = 'user',
  ADMIN = 'admin'
}

export class Location {
  city?: string;
  country?: string;
  lat?: string;
  long?: string;
}

export interface BirthDate {
  date: string;
  group: AgeGroup;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum AgeGroup {
  CHILD = 'child',
  YOUNG = 'young',
  ADULT = 'adult'
}

export enum LoginMethod {
  REGULAR = 'regular',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum UserError {
  GET = 'USER.ERRORS.getUserError',
  UPDATE = 'USER.ERRORS.updateUserError',
  GENERAL = 'ERRORS.GeneralBackendError'
}

export const MIN_DATE: NgbDateStruct = { year: 1920, day: 1, month: 1 }


