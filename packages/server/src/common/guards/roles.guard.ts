import { EnumRole } from './../enums/role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/schemas/user.schema';
import { matchRoles } from '../utils/match-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const shouldSkip = this.reflector.get<string>('skip', context.getHandler());
    if (shouldSkip) return true;

    const roles = this.reflector.get<EnumRole[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return matchRoles(user, roles);
  }
}
