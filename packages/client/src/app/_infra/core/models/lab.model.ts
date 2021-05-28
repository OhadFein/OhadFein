import { IFigure, IUser } from '@core/models';
import { LabStarVideo, LabUserVideo } from './video.model';

export interface LabItem {
  user: IUser;
  figure: IFigure;
  starVideo: LabStarVideo;
  userVideo?: LabUserVideo;
  practiceIsSaved?: boolean;
}

export const LAB_USER_VIDEO_DURATION_DIFF_LIMIT = 30;

export enum LabViewType {
  FULL = 'full',
  PREVIEW = 'preview',
  EMPTY = 'empty'
}

export enum LabPlayerType {
  MASTER = 'master',
  STUDENT = 'student'
}

export type LabPlayerPlaybackOperator = 'plus' | 'minus' | 'def';
export type LabPlayerJumpDirection = 'bwd' | 'fwd';

export enum ETabs {
  preview = 'Outline',
  Principles = 'Principles',
  Movements = 'Movements',
  Practices = 'Practices'
}
