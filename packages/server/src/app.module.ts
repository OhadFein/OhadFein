import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FiguresModule } from './figures/figures.module';
import { PracticesModule } from './practices/practices.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { FigureVideoModule } from './figure-video/figure-video.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { NotesModule } from './notes/notes.module';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    MongooseModule.forRoot(process.env.MONGODB_DEVELOPMENT_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    AuthModule,
    UsersModule,
    FiguresModule,
    FigureVideoModule,
    NotificationsModule,
    PracticesModule,
    S3Module,
    FigureVideoModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    S3Service,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
