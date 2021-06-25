import { Types } from 'mongoose';
import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { PracticesService } from './practices.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Practice } from './schemas/practice.schema';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FigureVideoService } from 'src/figure-video/figure-video.service';
import { S3Service } from 'src/s3/s3.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { DetailedPracticeDto, GetAllPracticesDto, PracticeBaseDto } from '@danskill/contract';

@UseGuards(JwtAuthGuard)
@Controller('practices')
export class PracticesController {
  constructor(
    private readonly figureVideosService: FigureVideoService,
    private readonly practicesService: PracticesService,
    private readonly s3Service: S3Service
  ) {}

  @Post(':videoId')
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @RequestUser() user: User,
    @Param('videoId') videoId: Types.ObjectId,
    @UploadedFile() videoFile: Express.Multer.File
  ) {
    const video = await this.figureVideosService.findOne(videoId);
    if (!video || !video.figure) throw new HttpException('Video not found', HttpStatus.NOT_FOUND);

    const s3video = await this.s3Service.upload(videoFile, user.username);
    return await this.practicesService.create(user, video, s3video);
  }

  @Get('all/:username?')
  @UseInterceptors(new TransformInterceptor(PracticeBaseDto))
  async getPractices(
    @RequestUser() reqUser: User,
    getAllPracticesDto?: GetAllPracticesDto,
    @Param('username') username?: string
  ): Promise<Practice[]> {
    const practices = await this.practicesService.findAllUsersPractices(
      reqUser,
      username,
      getAllPracticesDto
    );

    return practices;
  }

  @Get('single/:id')
  @UseInterceptors(new TransformInterceptor(DetailedPracticeDto))
  async findOne(@Param('id') id: Types.ObjectId): Promise<Practice> {
    return await this.practicesService.findOne(id);
  }

  @Delete('single/:id')
  async remove(@RequestUser() user: User, @Param('id') id: Types.ObjectId) {
    const deletedPractice = await this.practicesService.remove(user, id);
    if (!deletedPractice) {
      throw new HttpException('Practice not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
