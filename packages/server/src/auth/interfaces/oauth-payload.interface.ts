/* eslint-disable camelcase */

export interface OauthPayload {
  sub: string;
  aud: string;
  email_verified: boolean;
  token_use: string;
  auth_time: 1500009400;
  iss: string;
  'cognito:username': string;
  exp: Date;
  given_name: string;
  iat: Date;
  email: string;
}

/* eslint-enable camelcase */
