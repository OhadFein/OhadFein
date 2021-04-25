
// TODO: values should be with spaces?
export enum EnumDanceType {
  //Latin
  cha_cha_cha = "cha cha cha",
  samba = "samba",
  rumba = 'rumba',
  pasodoble = "pasodoble",
  jive = "jive",

  // Standard
  waltz = "waltz",
  tango = "tango",
  viennese_waltz = "viennese waltz",
  foxtrot = "foxtrot",
  quickstep = "quickstep",
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

export enum EnumLanguage {
  english = 'en'
}
export const possibleLanguages = Object.values(EnumLanguage);

export enum EnumAssociateModel {
  Video = "Video",
  Figure = "Figure"
}
export const possibleAssociateModels = Object.values(EnumAssociateModel);

export enum EnumRole {
  user = "user",
  coach = "coach",
  star = "star",
  admin = "admin"
}
export const possibleRoles = Object.values(EnumRole);

export enum EnumVideoType {
  // the following states are used for star only
  promo = "promo",
  basicPrinciples = "basicPrinciples",
  tips = "tips",
  exercises = "exercises",

  // the following states are shared for star and user
  comparable = "comparable",
  // challenge = "challenge"
}
export const possibleVideoTypes = Object.values(EnumVideoType);