import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Coach, Star } from './schemas/user.schema';
import { Skip } from 'src/common/decorators/skip.decorator';
import {
  CreateUserDto,
  StarDto,
  CoachDto,
  UserBaseDto,
  UserDto,
} from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { RequestUser } from 'src/common/decorators/request-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Skip()
  @Post()
  // TODO: return value shouldn't be the user!
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  @Get('single/:username?')
  @UseInterceptors(new TransformInterceptor(UserDto))
  async findOne(
    @RequestUser() reqUser: User,
    @Param('username') username?: string
  ): Promise<User> {
    const user = await this.usersService.findOne(username ?? reqUser.username);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('all/users')
  @UseInterceptors(new TransformInterceptor(UserBaseDto))
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }

  @Get('all/stars')
  @UseInterceptors(new TransformInterceptor(StarDto))
  async findAllStars(): Promise<Star[]> {
    return await this.usersService.findAllStars();
  }

  @Get('all/coaches')
  @UseInterceptors(new TransformInterceptor(CoachDto))
  async findAllCoaches(): Promise<Coach[]> {
    return await this.usersService.findAllCoaches();
  }
}
