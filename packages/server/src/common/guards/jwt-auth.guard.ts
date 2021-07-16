import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const shouldSkip = this.reflector.get<string>('skip', context.getHandler());
    if (shouldSkip) return true;

    return super.canActivate(context) as Promise<boolean>;
  }
}
