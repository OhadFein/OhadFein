import { PracticesModule } from './../practices/practices.module';
import { FigureVideoModule } from './../figure-video/figure-video.module';
import { FiguresModule } from 'src/figures/figures.module';
import { User, UserSchema } from './schemas/user.schema';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FiguresModule,
    FigureVideoModule,
    forwardRef(() => PracticesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
