import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';
import { Types } from 'mongoose';
import { CreateFigureVideoDto, FigureVideoBaseDto, FigureVideoDto } from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FigureVideoService } from './figure-video.service';

@Controller('figure-video')
export class FigureVideoController {
  constructor(private readonly figureVideoService: FigureVideoService) {}

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(FigureVideoDto))
  async getFigureVideo(@Param('id') id: Types.ObjectId): Promise<FigureVideo> {
    const video = await this.figureVideoService.findOne(id);
    // TODO: throw exception from the service?
    if (!video || !video.figure) throw new HttpException('Video not found', HttpStatus.NOT_FOUND);

    return this.figureVideoService.findOne(id);
  }

  @Roles(EnumRole.Admin)
  @Post(':id')
  @UseInterceptors(new TransformInterceptor(FigureVideoBaseDto))
  async create(
    @Param('id') id: Types.ObjectId,
    @Body() createFigureVideoDto: CreateFigureVideoDto
  ): Promise<FigureVideo> {
    return this.figureVideoService.create(id, createFigureVideoDto);
  }

  @Roles(EnumRole.Admin)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    // TODO: check if id is valid
    const deletedFigureVideo = await this.figureVideoService.remove(id);
    if (!deletedFigureVideo) {
      throw new HttpException('Figure video not found', HttpStatus.NOT_FOUND);
    }
  }
}
