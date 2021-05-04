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

export interface IStar {
    figures: IFigure[];
    description: string;
    logo: string;
    promo_video: string;
}

export interface IFigure {
    stars: string[],
    videos: string[]
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
