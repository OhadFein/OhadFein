import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret} from 'jwks-rsa';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NonRegisteredUsersJwtStrategy extends PassportStrategy(Strategy, 'nonRegisteredUserStrategy'){
  constructor(protected userService: UsersService) {

    super({      
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.COGNITO_AUTHORITY}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.COGNITO_CLIENT_ID,
      issuer: process.env.COGNITO_AUTHORITY,
      algorithms: ['RS256'],
      
    }
    );
    
  }

  public async validate(payload: any) {
    return payload.sub
  }
}
