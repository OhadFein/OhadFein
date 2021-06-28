export interface IStar {
  figures: IStarFigure[];
  description: string;
  logo: string;
  promo_video: string;
}

export interface IStarFigure {
  stars: string[];
  videos: string[];
}

export interface StarUserPics {
  small: string;
  large: string;
}

export enum StarError {
  GET = 'STAR.ERRORS.getStarsError',
  GENERAL = 'ERRORS.GeneralBackendError'
}

export enum StarSortingOptions {
  NAME = 'name',
  NUMBER_OF_FIGURES = 'numberOfFigures'
}
