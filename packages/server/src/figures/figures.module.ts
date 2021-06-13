import { FigureVideoModule } from './../figure-video/figure-video.module';
import { forwardRef, Module } from '@nestjs/common';
import { FiguresService } from './figures.service';
import { FiguresController } from './figures.controller';
import { Figure, FigureSchema } from './schemas/figure.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Figure.name, schema: FigureSchema }]),
    forwardRef(() => UsersModule),
    forwardRef(() => FigureVideoModule),
  ],
  controllers: [FiguresController],
  providers: [FiguresService],
  exports: [FiguresService, MongooseModule],
})
export class FiguresModule {}
