import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

export const RequestUser = createParamDecorator<User>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
