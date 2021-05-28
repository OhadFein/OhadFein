import { SafeUrl } from '@angular/platform-browser';

export interface Video {
  _id: string;
  name: string;
  path: string;
  view?: View;
  participatesAmount?: ParticipatesAmount;
  associatedObject: string;
  associatedModel: AssociateType;
  ownerUser?: string;
  ownerRole: number;
  type: VideoType;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number
}

export interface UploadVideoData {
  name: string;
  associatedObject: string,
  video: File
}

export enum View {
  FRONT = 'front',
  BACK = 'back'
}

export enum ParticipatesAmount {
  SOLO = 1,
  COUPLE = 2
}

export enum AssociateType {
  VIDEO = 'Video',
  FIGURE = 'Figure'
}

export enum VideoType {
  // the following states are used for star only
  PROMO = 'promo',
  BASIC_PRINCIPLES = 'basicPrinciples',
  TIPS = 'tips',
  EXERCISES = 'exercises',

  // the following states are shared for star and user
  COMPARABLE = 'comparable'
}

export class LabStarVideo implements Video {
  _id: string;
  name: string;
  path: string;
  view: View;
  thumbnail: string;
  participatesAmount: ParticipatesAmount;
  associatedObject: string;
  associatedModel: AssociateType = AssociateType.FIGURE;
  ownerUser: string;
  ownerRole: number;
  type: VideoType = VideoType.COMPARABLE;
}

export class LabUserVideo {
  associatedModel: string;
  associatedObject: any;
  createdAt?: string;
  ownerUser?: string;
  path?: string | SafeUrl;
  name?: string;
  updatedAt?: string;
  _v?: string;
  _id?: string;
  file?: File;
  readonly type: VideoType = VideoType.COMPARABLE;

  constructor(init?: Partial<LabUserVideo>) {
	Object.assign(this, init);
  }
}
