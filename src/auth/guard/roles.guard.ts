import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context
      .switchToHttp()
      .getRequest();

    const user: User = request.user;

    const hasRole = roles.indexOf(user.role) > -1;

    if (!hasRole)
      throw new ForbiddenException({
        message:
          'Permissions Error, not enough privileges',
        errorType: 'permissions',
        statusCode: 403,
      });

    return hasRole;
  }
}
