import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUserSub = createParamDecorator<string>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user; // This will be the sub property
  },
);
