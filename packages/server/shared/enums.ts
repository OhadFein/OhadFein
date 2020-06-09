export enum EnumDanceType {
    waltz = "waltz",
    tango = "tango",
    quickstep = "quickstep",
    foxtrot = "foxtrot"
}
export const possibleDanceTypes = Object.values(EnumDanceType);

export enum EnumDanceLevel {
  beginner = 1,
  intermediate = 2,
  advanced = 3
}
export const possibleDanceLevels = Object.values(EnumDanceLevel);

export enum EnumGender {
    MALE = 'male',
    FEMALE = 'female'
  }
export const possibleGenders = Object.values(EnumGender);
  
  export enum EnumAgeGroup {
    CHILD = 'child',
    YOUNG = 'young',
    ADULT = 'adult'
  }

  export enum EnumLanguage {
    english = 'en'
  }
export const possibleLanguages = Object.values(EnumLanguage);


export enum EnumView {
  front = 'front',
  back = 'back'
}
export const possibleViews = Object.values(EnumView);

export enum EnumParticipatesAmount {
  solo = 1,
  couple = 2
}
export const possibleParticipatesAmounts = Object.values(EnumParticipatesAmount);

export enum EnumAssociateType {
  video = "video",
  figure = "figure"
}
export const possibleAssociateTypes = Object.values(EnumAssociateType);

export enum EnumVideoType {
  // the following states are used for star only
  promo = "promo",
  basicPrinciples = "basicPrinciples",
  additional = "additional",

  // the following states are shared for star and user
  comparable = "comparable",
  // challenge = "challenge"
}
export const possibleVideoTypes = Object.values(EnumVideoType);