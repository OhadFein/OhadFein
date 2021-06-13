import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Skip } from 'src/common/decorators/skip.decorator';
import { CreateUserDto, GetAllUsersDto } from '../../../contract/lib/users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Skip()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('single/:username')
  async findOne(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  @Get('all/:role')
  async findAll(@Param() getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    return await this.usersService.findAll(getAllUsersDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}
