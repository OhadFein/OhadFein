import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FigureVideo,
  FigureVideoDocument,
} from './schemas/figure-video.schema';
import { Types, Model } from 'mongoose';

@Injectable()
export class FigureVideoService {
  constructor(
    @InjectModel(FigureVideo.name)
    private readonly figureVideoModel: Model<FigureVideoDocument>,
  ) {}

  async findOne(id: Types.ObjectId): Promise<FigureVideo> {
    const figureVideo = await this.figureVideoModel.findOne({ _id: id }).exec();

    if (figureVideo) {
      throw new HttpException('Figure video not found', HttpStatus.NOT_FOUND);
    }

    return figureVideo;
  }

  async remove(id: Types.ObjectId): Promise<FigureVideo> {
    return await this.figureVideoModel.findByIdAndRemove({ _id: id }).exec();
  }
}
