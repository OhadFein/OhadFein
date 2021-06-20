import { FigureVideoService } from './../figure-video/figure-video.service';
import { S3 } from 'aws-sdk';
import { FilterQuery, Model, Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Practice, PracticeDocument } from './schemas/practice.schema';
import { User } from 'src/users/schemas/user.schema';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import { FiguresService } from 'src/figures/figures.service';
import { S3Service } from 'src/s3/s3.service';
import { UsersService } from 'src/users/users.service';
import { Note } from 'src/notes/schemas/note.schema';
import { GetAllPracticesDto } from '@danskill/contract';

@Injectable()
export class PracticesService {
  constructor(
    @InjectModel(Practice.name)
    private readonly practiceModel: Model<PracticeDocument>,
    private readonly figuresService: FiguresService,
    private readonly usersService: UsersService,
    private readonly figureVideoService: FigureVideoService,
    private readonly s3Service: S3Service
  ) {}

  async create(
    user: User,
    video: FigureVideo,
    s3file: S3.ManagedUpload.SendData
  ): Promise<Practice> {
    const createdPractice = new this.practiceModel({
      figure: video.figure,
      video: video._id,
      user: user._id,
      key: s3file.Key,
    });

    await createdPractice.save();
    await this.usersService.addPractice(user, createdPractice._id);

    return createdPractice;
  }

  async findOne(id: Types.ObjectId): Promise<Practice> {
    return await this.practiceModel.findOne({ _id: id }).exec();
  }

  async findAll(getAllPracticesDto: GetAllPracticesDto) {
    const query: FilterQuery<PracticeDocument> = {};

    if (getAllPracticesDto.figureId) {
      const figure = await this.figuresService.findOne(
        getAllPracticesDto.figureId
      );
      if (!figure)
        throw new HttpException('Figure not found', HttpStatus.NOT_FOUND);
      query.figure = { $eq: figure._id };
    }

    return await this.practiceModel.find(query).exec();
  }

  async remove(user: User, id: Types.ObjectId) {
    const practice = await this.practiceModel
      .findByIdAndRemove({ _id: id })
      .exec();
    await this.s3Service.remove(practice.key);
    await this.usersService.removePractice(user, id);

    return; // TODO:
  }

  async addNote(note: Note) {
    return this.practiceModel
      .updateOne({ _id: note.practice }, { $addToSet: { notes: note._id } })
      .exec();
  }
}
