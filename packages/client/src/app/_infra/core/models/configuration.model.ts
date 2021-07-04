export interface Configuration {
  majorVersion: number;
  minorVersion: number;
  buildVersion: number;
  buildType: BuildType;
  restURL: string;
  aboutVideoURL: string;
}

export enum BuildType {
  PROD = 'PROD',
  DEV = 'DEV'
}
