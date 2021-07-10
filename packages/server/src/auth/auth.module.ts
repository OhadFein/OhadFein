import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { NonRegisteredUsersJwtStrategy } from './strategies/non-registered-users-jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, NonRegisteredUsersJwtStrategy],
})
export class AuthModule {}
