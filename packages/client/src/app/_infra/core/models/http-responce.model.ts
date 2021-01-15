import { AuthTokens } from './auth.model';
import { Figure } from './figure.model';
import { IStar } from './star.model';
import { User } from './user.model';
import {Practice} from "@models/practices.model";

// export type RegistrationErrorCode = 'PASSWORD_SHORT' | 'INVALID_EMAIL' | 'PASSWORD_MISMATCH' | 'USER_EXISTS';
// export type LoginErrorCode = 'INVALID_EMAIL' | 'BLANK_PASSWORD' | 'SIGN_PROVIDER_NO_CREDENTIALS';
// export type ForgotPasswordErrorCode = 'INVALID_EMAIL' | 'NON_EXISTING_USER';


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
    data?: Array<IStar>;
}

export interface FiguresRestResponse extends IRestResponse {
    data?: Array<Figure>;
}
export interface SingleFigureRestResponse extends IRestResponse {
    data?: Figure;
}
export interface PracticeItemsRestResponse extends IRestResponse {
    data?: Array<Practice>;
}

export interface UpdatePracticeItemsRestResponse extends IRestResponse {
    data?: Practice;
}