import { NotesModule } from './../notes/notes.module';
import { FigureVideoModule } from './../figure-video/figure-video.module';
import { S3Module } from './../s3/s3.module';
import { forwardRef, Module } from '@nestjs/common';
import { Practice, PracticeSchema } from './schemas/practice.schema';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { FiguresModule } from 'src/figures/figures.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Practice.name, schema: PracticeSchema },
    ]),
    forwardRef(() => UsersModule),
    S3Module,
    FigureVideoModule,
    FiguresModule,
    forwardRef(() => NotesModule),
  ],
  controllers: [PracticesController],
  providers: [PracticesService],
  exports: [PracticesService, MongooseModule],
})
export class PracticesModule {}
