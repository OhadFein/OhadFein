import { FiguresModule } from 'src/figures/figures.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PracticesModule } from '../practices/practices.module';
import { FigureVideoModule } from '../figure-video/figure-video.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => PracticesModule),
    forwardRef(() => FiguresModule),
    forwardRef(() => FigureVideoModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
