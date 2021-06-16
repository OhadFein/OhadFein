import { UsersService } from './../users/users.service';
import { Types, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Figure, FigureDocument } from './schemas/figure.schema';
import { GetAllFiguresDto } from '@danskill/contract';

@Injectable()
export class FiguresService {
  constructor(
    @InjectModel(Figure.name)
    private readonly figureModel: Model<FigureDocument>,
    private readonly usersService: UsersService,
  ) {}

  async findOne(id: Types.ObjectId): Promise<Figure> {
    return await this.figureModel
      .findOne({ _id: id })
      .populate('videos')
      .exec();
  }

  async findAll(getAllFiguresDto: GetAllFiguresDto): Promise<Figure[]> {
    // TODO: add some queries and create interface for query var
    const query: any = {};

    if (getAllFiguresDto.starUsername) {
      const star = await this.usersService.findOne(
        getAllFiguresDto.starUsername,
      );
      if (!star)
        throw new HttpException('Star not found', HttpStatus.NOT_FOUND);

      query.stars = { $in: [star._id] };
    }

    return this.figureModel.find(query).populate('videos').exec();
  }
}
