import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { FigureVideoService } from './figure-video.service';
import { FigureVideoController } from './figure-video.controller';
import { FigureVideo, FigureVideoSchema } from './schemas/figure-video.schema';
import { UsersModule } from 'src/users/users.module';
import { FiguresModule } from 'src/figures/figures.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FigureVideo.name, schema: FigureVideoSchema },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => FiguresModule),
  ],
  controllers: [FigureVideoController],
  providers: [FigureVideoService],
  exports: [FigureVideoService, MongooseModule],
})
export class FigureVideoModule {}
