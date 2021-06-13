import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const shouldSkip = this.reflector.get<string>('skip', context.getHandler());
    if (shouldSkip) return true;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return this.matchRoles(user, roles);
  }

  private matchRoles(user: User, roles: string[]) {
    const hasRole = () =>
      user.roles.some((role: string) => !!roles.find((item) => item === role));

    return user && user.roles && hasRole();
  }
}
