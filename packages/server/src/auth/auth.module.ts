import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { NonRegisteredUsersJwtStrategy } from './strategies/non-registered-users-jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategy, NonRegisteredUsersJwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
