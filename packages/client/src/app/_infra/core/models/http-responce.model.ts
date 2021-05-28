import { AuthTokens } from './auth.model';
import { IUser, IFigure } from '@core/models';
import { User } from './user.model';
import { Practice } from '@models/practices.model';

export interface IRestResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface AuthRestResponse extends IRestResponse {
  data?: AuthTokens;
}

export interface UserRestResponse extends IRestResponse {
  data?: User;
}

export interface StarsRestResponse extends IRestResponse {
  data?: IUser[];
}

export interface FiguresRestResponse extends IRestResponse {
  data?: IFigure[];
}

export interface SingleFigureRestResponse extends IRestResponse {
  data?: IFigure;
}

export interface PracticeItemsRestResponse extends IRestResponse {
  data?: Practice[];
}

export interface UpdatePracticeItemsRestResponse extends IRestResponse {
  data?: Practice;
}
