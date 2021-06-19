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
import { CreateUserDto, GetAllUsersDto, AddUserDetailsDTO } from '@danskill/contract';

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

  @Post('add_details')
  async add_user_details(@Body() addUserDetailsDTO: AddUserDetailsDTO): Promise<User> {
    const user = await this.usersService.addUserDetails(addUserDetailsDTO);

    return user;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
}
