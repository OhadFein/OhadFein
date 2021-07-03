import { EnumRole } from './../common/enums/role.enum';
import { S3 } from 'aws-sdk';
import { Model, Types } from 'mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Practice, PracticeDocument } from './schemas/practice.schema';
import { User } from 'src/users/schemas/user.schema';
import { FigureVideo } from 'src/figure-video/schemas/figure-video.schema';
import { S3Service } from 'src/s3/s3.service';
import { UsersService } from 'src/users/users.service';
import { Note } from 'src/notes/schemas/note.schema';
import { GetAllPracticesDto } from '@danskill/contract';
import { matchRoles } from 'src/common/utils/match-roles';

@Injectable()
export class PracticesService {
  constructor(
    @InjectModel(Practice.name)
    private readonly practiceModel: Model<PracticeDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
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

  async findAllUsersPractices(
    reqUser: User,
    username?: string,
    getAllPracticesDto?: GetAllPracticesDto
  ): Promise<Practice[]> {
    let usernameToFind: string;

    if (username && username != reqUser.username) {
      const user = await this.usersService.findOne(username);
      if (matchRoles(reqUser, [EnumRole.Coach]) && user.coach.equals(reqUser._id)) {
        usernameToFind = username;
      } else {
        throw new HttpException('', HttpStatus.UNAUTHORIZED);
      }
    } else {
      usernameToFind = reqUser.username;
    }

    return await this.usersService.getPractices(usernameToFind, getAllPracticesDto);
  }

  async findOne(id: Types.ObjectId): Promise<Practice> {
    return await this.practiceModel.findOne({ _id: id }).populate('video notes').exec();  // TODO: replace the strings with fixed values
  }

  async remove(user: User, id: Types.ObjectId): Promise<Practice> {
    const practice = await this.practiceModel.findByIdAndRemove({ _id: id }).exec();
    await this.s3Service.remove(practice.key);
    await this.usersService.removePractice(user, id);

    return practice;
  }

  async addNote(note: Note) {
    return this.practiceModel
      .updateOne({ _id: note.practice }, { $addToSet: { notes: note._id } })
      .exec();
  }

  async removeNote(note: Note) {
    return this.practiceModel
      .updateOne({ _id: note.practice }, { $pull: { notes: note._id } })
      .exec();
  }
}
