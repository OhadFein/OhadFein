import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AddUserDetailsDTO, CreateUserDto, GetAllUsersDto } from '@danskill/contract';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      email: createUserDto.email,
      password: hash,
      username: createUserDto.username,
      given_name: createUserDto.given_name,
      family_name: createUserDto.family_name,
      birthdate: createUserDto.birthdate,
    });

    await createdUser.save();

    return createdUser;
  }

  async addUserDetails(addUserDetailsDTO: AddUserDetailsDTO): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("testPass" ,salt);
    // TODO decide what are we going to do with the existing model (remove password / create a new model)
    const createdUser = new this.userModel({
      email: addUserDetailsDTO.email,
      password: hash,
      username: addUserDetailsDTO.username,
      given_name: addUserDetailsDTO.firstName,
      family_name: addUserDetailsDTO.lastName,
    });

    await createdUser.save();

    return createdUser;
  }

  async findOneForAuth(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email: email })
      .select('+password')
      .exec();
  }

  async findOneForJwt(_id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(_id).select('+roles').exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAll(getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    return this.userModel
      .find({ roles: { $in: [getAllUsersDto.role] } })
      .exec();
  }

  async addPractice(user: User, practiceId: Types.ObjectId) {
    return this.userModel
      .updateOne({ _id: user._id }, { $addToSet: { practices: practiceId } })
      .exec();
  }

  async removePractice(user: User, practiceId: Types.ObjectId) {
    return this.userModel
      .updateOne({ _id: user._id }, { $pull: { practices: practiceId } })
      .exec();
  }
}
