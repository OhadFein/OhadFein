import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FigureVideo,
  FigureVideoDocument,
} from './schemas/figure-video.schema';
import { Types, Model } from 'mongoose';
import { CreateFigureVideoDto } from '@danskill/contract';

@Injectable()
export class FigureVideoService {
  constructor(
    @InjectModel(FigureVideo.name)
    private readonly figureVideoModel: Model<FigureVideoDocument>
  ) {}

  async findOne(id: Types.ObjectId): Promise<FigureVideo> {
    return await this.figureVideoModel.findOne({ _id: id }).exec();
  }

  async create(
    id: Types.ObjectId,
    createFigureVideoDto: CreateFigureVideoDto
  ): Promise<FigureVideo> {
    const createdFigureVideo = new this.figureVideoModel({
      figure: id,
      stars: createFigureVideoDto.stars,
      key: createFigureVideoDto.key,
      thumbnail: createFigureVideoDto.thumbnail,
      type: createFigureVideoDto.type,
    });

    await createdFigureVideo.save();

    return createdFigureVideo;
  }

  async remove(id: Types.ObjectId): Promise<FigureVideo> {
    return await this.figureVideoModel.findByIdAndRemove({ _id: id }).exec();
  }
}
