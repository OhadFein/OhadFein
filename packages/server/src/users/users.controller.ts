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
import { CreateUserDto, StarDto, CoachDto, UserBaseDto, UserDto } from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Skip()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);

    return;
  }

  @Get('exists/:email')
  async doesUserExists(@Param('email') email: string): Promise<boolean> {
    const user = await this.usersService.findOneForAuth(email)
    return user !== null
  }

  @Get('single/:username?')
  @UseInterceptors(new TransformInterceptor(UserDto))
  async findOne(@RequestUser() reqUser: User, @Param('username') username?: string): Promise<User> {
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

  @Roles(EnumRole.Coach)
  @UseInterceptors(new TransformInterceptor(UserBaseDto))
  @Get('students')
  async getStudents(@RequestUser() reqUser: User): Promise<User[]> {
    return await this.usersService.getStudents(reqUser);
  }

  @Post('coach/:username')
  async setCoach(@RequestUser() reqUser: User, @Param('username') username: string) {
    await this.usersService.setCoach(reqUser, username);
    
    return;
  }

}
