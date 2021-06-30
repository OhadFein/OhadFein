import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret} from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_Xb86k2ih2/.well-known/jwks.json',
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.COGNITO_CLIENT_ID,
      issuer: process.env.COGNITO_AUTHORITY,
      algorithms: ['RS256'],
      ignoreExpiration: true,
    });
    
  }

  public async validate(payload: any) {
    // TODO we will need to query the user from the db and add to the request headers
    return !!payload.sub;
  }
}
