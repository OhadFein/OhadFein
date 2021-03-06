import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Skip } from 'src/common/decorators/skip.decorator';
import {
  CreateUserDto,
  StarDto,
  CoachDto,
  UserBaseDto,
  UserDto,
  CreateStarDto,
  UpdateUserDto,
} from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EnumRole } from 'src/common/enums/role.enum';
import { NonRegisteredJwtGuard } from 'src/common/guards/non-registered-jwt-auth.guard';
import { User, Coach, Star } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Skip()
  @UseGuards(NonRegisteredJwtGuard)
  @UseInterceptors(new TransformInterceptor(UserDto))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  @Roles(EnumRole.Admin)
  @Post('/star/:slug')
  @UseGuards(NonRegisteredJwtGuard)
  @UseInterceptors(new TransformInterceptor(StarDto))
  async createStar(
    @Body() createStarDto: CreateStarDto,
    @Param('slug') slug: string
  ): Promise<User> {
    const user = await this.usersService.createStar(slug, createStarDto);

    return user;
  }

  @Get('test')
  @Skip()
  @UseGuards(NonRegisteredJwtGuard)
  async test(): Promise<any> {
    return {
      access: process.env.ACCESS_KEY_ID ?? 'FAILED',
      env: process.env,
    };
  }

  @Get('exists')
  @Skip()
  @UseGuards(NonRegisteredJwtGuard)
  async doesUserExists(@RequestUser() userMail: string): Promise<boolean> {
    const user = await this.usersService.findOneForJwt(userMail);

    return user !== null;
  }

  @Get('single/:slug?')
  @UseInterceptors(new TransformInterceptor(UserDto))
  async findOne(@RequestUser() reqUser: User, @Param('slug') slug?: string): Promise<User> {
    const user = await this.usersService.findOne(slug ?? reqUser.slug);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('all/users')
  @UseInterceptors(new TransformInterceptor(UserBaseDto))
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('single/star/:slug?')
  @UseInterceptors(new TransformInterceptor(StarDto))
  async findOneStar(@Param('slug') slug?: string): Promise<Star> {
    const user = await this.usersService.findOne(slug);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('all/stars')
  @UseInterceptors(new TransformInterceptor(StarDto))
  async findAllStars(): Promise<Star[]> {
    return this.usersService.findAllStars();
  }

  @Get('all/coaches')
  @UseInterceptors(new TransformInterceptor(CoachDto))
  async findAllCoaches(): Promise<Coach[]> {
    return this.usersService.findAllCoaches();
  }

  @Roles(EnumRole.Coach)
  @UseInterceptors(new TransformInterceptor(UserBaseDto))
  @Get('students')
  async getStudents(@RequestUser() reqUser: User): Promise<User[]> {
    return this.usersService.getStudents(reqUser);
  }

  @Patch()
  async updateUserDetails(
    @RequestUser() reqUser: User,
    @Body() updateUserReq: UpdateUserDto
  ): Promise<void> {
    return this.usersService.updateUserDetails(reqUser, updateUserReq);
  }
}
