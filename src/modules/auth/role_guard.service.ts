import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthError from 'src/common/error/auth_error';
import Redis from 'src/common/redis';
import Utils from 'src/utils/utils';

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
    if (!Utils.isExists(token)) return true;
    let userId = await Redis.get(token);
    if (!userId) {
      return true;
    }
    return false;
  }
}
