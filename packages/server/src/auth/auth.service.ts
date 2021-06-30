import { User } from './../users/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // TODO probably delete
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneForAuth(email);
    const isPasswordMatch = await compare(password, user.password);
    if (user && isPasswordMatch) {
      // TODO: remove password from result?
      const result = user;

      return result;
    }

    return null;
  }

  // TODO probably delete
  async login(user: User) {
    const payload = { _id: user._id };

    return {
      access_token: "",
    };
  }
}
