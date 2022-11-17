import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthError from 'src/common/error/auth_error';
import AuthRedis from 'src/common/redis/auth';
import UserEntity from 'src/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    if (noAuth) {
      return true;
    }
    const token = request.headers['token'];
    const authResult = await this.authUser(token);
    if (authResult) {
      throw new AuthError('用户未登录');
    }
    return true;
  }

  async authUser(token: string) {
    const user: UserEntity = await AuthRedis.getToken(token);
    if (!user) {
      return true;
    }
    return false;
  }
}
