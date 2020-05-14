import { IUser } from "./models/User";

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      MONGODB_URI: string;

      SESSION_SECRET: string;

      MAILGUN_USER: string;
      MAILGUN_PASSWORD: string;

      SENDGRID_API_KEY: string;

      FACEBOOK_ID: string;
      FACEBOOK_SECRET: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}