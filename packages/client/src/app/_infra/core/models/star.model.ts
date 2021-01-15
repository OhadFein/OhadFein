import { IStarContent } from './star-content.model';
import { Tag } from './tag.model';
import { Location } from './user.model';


export interface IStar {
    _id: string;
    name: Name;
    slug: string;
    location: Location;
    logo: StarUserPics;
    promoVideo: string;
    achievements?: Array<string>;
    about?: string;
    figures?: Array<any>
    createdAt?: Date;
    updatedAt?: Date;
    description: string;
}

export interface Name {
    firstName: string;
    lastName: string;
    nickname?: string;
}

export interface StarUserPics {
    small: string;
    large: string;
}

export interface StarBasicInfo {
    _id: string;
    name: Name;
    userPics: StarUserPics;
}


export enum StarError {
    GET = 'STAR.ERRORS.getStarsError',
    GENERAL = 'ERRORS.GeneralBackendError'
}

export enum StarSortingOptions {
    NAME = 'name',
    NUMBER_OF_FIGURES = 'numberOfFigures'
}