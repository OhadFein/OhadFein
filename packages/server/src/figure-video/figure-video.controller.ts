import { FigureVideoBaseDto } from './../../../contract/src/figure-video/figure-video-base.dto';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FigureVideoService } from './figure-video.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';
import { Types } from 'mongoose';
import { CreateFigureVideoDto } from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('figure-video')
export class FigureVideoController {
  constructor(private readonly figureVideoService: FigureVideoService) {}

  @Roles(EnumRole.Admin)
  @Post(':id')
  @UseInterceptors(new TransformInterceptor(FigureVideoBaseDto))
  async create(
    @Param('id') id: Types.ObjectId,
    @Body() createFigureVideoDto: CreateFigureVideoDto
  ): Promise<FigureVideo> {
    return await this.figureVideoService.create(id, createFigureVideoDto);
  }

  @Roles(EnumRole.Admin)
  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    // TODO: check if id is valid
    const deletedFigureVideo = await this.figureVideoService.remove(id);
    if (!deletedFigureVideo) {
      throw new HttpException('Figure video not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
