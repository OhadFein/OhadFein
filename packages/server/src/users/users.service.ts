import { FilterQuery, Model, Types } from 'mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, EnumNotificationType, GetAllPracticesDto } from '@danskill/contract';
import { Practice } from 'src/practices/schemas/practice.schema';
import { FiguresService } from 'src/figures/figures.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { EnumNotificationLinkedModel } from 'src/common/enums/notification-linked-model.enum';
import { User, UserDocument, Coach, Star } from './schemas/user.schema';
import { EnumRole } from '../common/enums/role.enum';
import { matchRoles } from '../common/utils/match-roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => FiguresService))
    private readonly figuresService: FiguresService,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = await this.getUniqueUsername(createUserDto);
    const createdUser = new this.userModel({
      username,
      sub: createUserDto.sub,
    });

    await createdUser.save();

    return createdUser;
  }

  /* eslint-disable no-await-in-loop */
  async getUniqueUsername(createUserDto: CreateUserDto): Promise<string> {
    let currUserName = createUserDto.username;
    let i = 1;
    while ((await this.findOne(currUserName)) !== null) {
      currUserName += i;
      i += 1;
    }

    return currUserName;
  }
  /* eslint-enable no-await-in-loop */

  async findOneForAuth(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findOneForJwt(sub: string): Promise<User> {
    return this.userModel.findOne({ sub }).select('+roles').exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find({ roles: { $in: [EnumRole.User] } }).exec();
  }

  async findAllStars(): Promise<Star[]> {
    return this.userModel
      .find({ roles: { $in: [EnumRole.Star] } })
      .populate('figures') // TODO: replace the strings with fixed values
      .exec();
  }

  async findAllCoaches(): Promise<Coach[]> {
    return this.userModel
      .find({ roles: { $in: [EnumRole.Coach] } })
      .populate('students') // TODO: replace the strings with fixed values
      .exec();
  }

  async addPractice(user: User, practiceId: Types.ObjectId): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(user._id, { $addToSet: { practices: practiceId } }, { new: true })
      .exec();

    if (updatedUser.coach) {
      const coach = await this.userModel.findById(updatedUser.coach).exec();
      const notification = await this.notificationsService.build(
        [user._id],
        [coach],
        EnumNotificationType.NewPractice,
        EnumNotificationLinkedModel.Practice,
        practiceId
      );

      await notification.save();
      await this.userModel
        .findByIdAndUpdate(coach._id, { $addToSet: { notifications: notification._id } })
        .exec();
    }

    return updatedUser;
  }

  async removePractice(user: User, practiceId: Types.ObjectId): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(user._id, { $pull: { practices: practiceId } }, { new: true })
      .exec();
  }

  async getPractices(
    username: string,
    getAllPracticesDto?: GetAllPracticesDto
  ): Promise<Practice[]> {
    const query: FilterQuery<UserDocument> = {};
    if (getAllPracticesDto?.figureId) {
      const figure = await this.figuresService.findOne(getAllPracticesDto.figureId);
      if (!figure) throw new HttpException('Figure not found', HttpStatus.NOT_FOUND);
      query.figure = { $eq: figure._id };
    }

    // TOODO: check the query
    const userWithPractices = await this.userModel
      .findOne({ username })
      .populate({
        path: 'practices', // TODO: replace the strings with fixed values
        match: query,
      })
      .exec();

    return userWithPractices.practices as Practice[];
  }

  async getStudents(reqUser: User): Promise<User[]> {
    const userWithStudents = await this.userModel.findById(reqUser._id).populate('students').exec(); // TODO: replace the strings with fixed values

    return userWithStudents.students;
  }

  async setCoach(reqUser: User, username: string): Promise<void> {
    // TODO: use transactions https://mongoosejs.com/docs/transactions.html
    const newCoach = await this.findOne(username);
    if (!newCoach || !matchRoles(newCoach, [EnumRole.Coach]))
      throw new HttpException('Coach not found', HttpStatus.NOT_FOUND);

    if (!reqUser.coach || !reqUser.coach.equals(newCoach._id)) {
      if (reqUser.coach) await this.removeStudent(reqUser.coach, reqUser);
      await this.userModel.updateOne({ _id: reqUser._id }, { $set: { coach: newCoach._id } });
      await this.addStudent(newCoach._id, reqUser);
    }
  }

  async addStudent(coachId: Types.ObjectId, student: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(coachId, { $addToSet: { students: student._id } }, { new: true })
      .exec();
  }

  async removeStudent(coachId: Types.ObjectId, student: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(coachId, { $pull: { students: student._id } }, { new: true })
      .exec();
  }
}
