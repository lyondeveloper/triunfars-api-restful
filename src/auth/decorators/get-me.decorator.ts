import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetMe = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
