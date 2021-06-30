import { matchRoles } from './../common/utils/match-roles';
import { EnumRole } from './../common/enums/role.enum';
import { FilterQuery, Model, Types } from 'mongoose';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, Coach, Star } from './schemas/user.schema';
import { AddUserDetailsDTO, CreateUserDto, GetAllPracticesDto } from '@danskill/contract';
import { genSalt, hash } from 'bcryptjs';
import { Practice } from 'src/practices/schemas/practice.schema';
import { FiguresService } from 'src/figures/figures.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => FiguresService))
    private readonly figuresService: FiguresService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const password = await hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      email: createUserDto.email,
      password: password,
      username: createUserDto.username,
      given_name: createUserDto.given_name,
      family_name: createUserDto.family_name,
      birthdate: createUserDto.birthdate,
    });

    await createdUser.save();

    return createdUser;
  }

  async addUserDetails(addUserDetailsDTO: AddUserDetailsDTO): Promise<User> {
    const salt = await genSalt(10);
    const some_hash = await hash("testPass" ,salt);
    // TODO decide what are we going to do with the existing model (remove password / create a new model)
    const createdUser = new this.userModel({
      email: addUserDetailsDTO.email,
      password: some_hash,
      username: addUserDetailsDTO.username,
      given_name: addUserDetailsDTO.firstName,
      family_name: addUserDetailsDTO.lastName,
    });

    await createdUser.save();

    return createdUser;
  }

  async findOneForAuth(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).select('+password').exec();
  }

  async findOneForJwt(_id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(_id).select('+roles').exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find({ roles: { $in: [EnumRole.User] } }).exec();
  }

  async findAllStars(): Promise<Star[]> {
    return this.userModel
      .find({ roles: { $in: [EnumRole.Star] } })
      .populate('figures')
      .exec();
  }

  async findAllCoaches(): Promise<Coach[]> {
    return this.userModel
      .find({ roles: { $in: [EnumRole.Coach] } })
      .populate('students')
      .exec();
  }

  async addPractice(user: User, practiceId: Types.ObjectId) {
    return this.userModel
      .updateOne({ _id: user._id }, { $addToSet: { practices: practiceId } })
      .exec();
  }

  async removePractice(user: User, practiceId: Types.ObjectId) {
    return this.userModel.updateOne({ _id: user._id }, { $pull: { practices: practiceId } }).exec();
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
      .findOne({ username: username })
      .populate({
        path: 'practices',
        match: query,
      })
      .exec();

    return userWithPractices.practices as Practice[];
  }

  async getStudents(reqUser: User): Promise<User[]> {
    const userWithStudents = await this.userModel.findById(reqUser._id).populate('students').exec();

    return userWithStudents.students;
  }

  async setCoach(reqUser: User, username: string) {
    // TODO: use transactions https://mongoosejs.com/docs/transactions.html
    const newCoach = await this.findOne(username);
    if (!newCoach || !matchRoles(newCoach, [EnumRole.Coach]))
      throw new HttpException('Coach not found', HttpStatus.NOT_FOUND);

    if (!reqUser.coach || !reqUser.coach.equals(newCoach._id)) {
      if (reqUser.coach) await this.removeStudent(reqUser.coach, reqUser);
      await this.userModel.updateOne({ _id: reqUser._id }, { $set: { coach: newCoach._id } });
      await this.addStudent(newCoach._id, reqUser);
    }

    return;
  }

  async addStudent(coachId: Types.ObjectId, student: User) {
    return this.userModel
      .updateOne({ _id: coachId }, { $addToSet: { students: student._id } })
      .exec();
  }

  async removeStudent(coachId: Types.ObjectId, student: User) {
    return this.userModel.updateOne({ _id: coachId }, { $pull: { students: student._id } }).exec();
  }
}
