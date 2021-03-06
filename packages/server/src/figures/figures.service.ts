import { UsersService } from 'src/users/users.service';
import { Types, Model, FilterQuery } from 'mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFigureDto, GetAllFiguresByTypeDto, GetAllFiguresDto } from '@danskill/contract';
import { Figure, FigureDocument } from './schemas/figure.schema';
import { FigureVideo } from '../figure-video/schemas/figure-video.schema';

@Injectable()
export class FiguresService {
  constructor(
    @InjectModel(Figure.name)
    private readonly figureModel: Model<FigureDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  async findOne(id: Types.ObjectId): Promise<Figure> {
    return this.figureModel
      .findOne({ _id: id })
      .populate('videos stars') // TODO: replace the strings with fixed values
      .exec();
  }

  async findAll(getAllFiguresDto: GetAllFiguresDto): Promise<Figure[]> {
    const query: FilterQuery<FigureDocument> = {};

    if (getAllFiguresDto.starUsername) {
      const star = await this.usersService.findOne(getAllFiguresDto.starUsername);
      if (!star) throw new HttpException('Star not found', HttpStatus.NOT_FOUND);

      query.stars = { $in: [star._id] };
    }

    return this.figureModel.find(query).populate('videos').exec(); // TODO: replace the strings with fixed values
  }

  async findAllByType(getAllFiguresByTypeDto: GetAllFiguresByTypeDto): Promise<Figure[]> {
    const allFigures = await this.findAll(getAllFiguresByTypeDto);

    return allFigures.filter((figure: Figure) => figure.type === getAllFiguresByTypeDto.figureType);
  }

  async create(createFigureDto: CreateFigureDto): Promise<Figure> {
    const createdFigure = new this.figureModel({
      stars: createFigureDto.stars,
      name: createFigureDto.name,
      logo: createFigureDto.logo,
      type: createFigureDto.type,
      level: createFigureDto.level
    });

    await createdFigure.save();
    await this.usersService.addFigure(createdFigure);

    return createdFigure;
  }

  async remove(id: Types.ObjectId): Promise<Figure> {
    const figure = await this.figureModel.findByIdAndRemove({ _id: id }).exec();
    await this.usersService.removeFigure(figure);

    return figure;
  }

  async addVideo(video: FigureVideo): Promise<Figure> {
    return this.figureModel
      .findByIdAndUpdate(video.figure, { $addToSet: { videos: video._id } }, { new: true })
      .exec();
  }

  async removeVideo(video: FigureVideo): Promise<Figure> {
    return this.figureModel
      .findByIdAndUpdate(video.figure, { $pull: { videos: video._id } }, { new: true })
      .exec();
  }
}
