import { InjectModel } from '@nestjs/mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';
import { CreateFigureVideoDto } from '@danskill/contract';
import { FiguresService } from 'src/figures/figures.service';
import { FigureVideo, FigureVideoDocument } from './schemas/figure-video.schema';

@Injectable()
export class FigureVideoService {
  constructor(
    @InjectModel(FigureVideo.name)
    private readonly figureVideoModel: Model<FigureVideoDocument>,
    @Inject(forwardRef(() => FiguresService))
    private readonly figuresService: FiguresService
  ) {}

  async findOne(id: Types.ObjectId): Promise<FigureVideo> {
    return this.figureVideoModel.findOne({ _id: id }).exec();
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
      duration: createFigureVideoDto.duration,
      shooting_angle: createFigureVideoDto.shooting_angle
    });

    await createdFigureVideo.save();
    await this.figuresService.addVideo(createdFigureVideo);

    return createdFigureVideo;
  }

  async remove(id: Types.ObjectId): Promise<FigureVideo> {
    const video = await this.figureVideoModel.findByIdAndRemove({ _id: id }).exec();
    await this.figuresService.removeVideo(video);

    return video;
  }
}
