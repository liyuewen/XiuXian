import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthError from 'src/common/error/authError';
import AuthRedis from 'src/common/redis/auth';
import UserEntity from 'src/entity/user.entity';

/**
 * 用于判断用户是否有权限创建物品
 */
@Injectable()
export class RoleCreate implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const noAuth = this.reflector.get<boolean>('no-root-auth', context.getHandler());
    if (noAuth) {
      return true;
    }
    const token = request.headers['token'];
    const authResult = await this.isAuth(token);
    if (authResult) {
      throw new AuthError('用户无权限');
    }
    return true;
  }

  async isAuth(token: string) {
    const user: UserEntity = await AuthRedis.getToken(token);
    if (user.createCommodity === '1') {
      return false;
    }
    return true;
  }
}
