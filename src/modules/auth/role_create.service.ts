import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthError from 'src/common/error/auth_error';
import Redis from 'src/common/redis';
import UserEntity from 'src/entity/user.entity';
import Utils from 'src/utils/utils';

/**
 * 用于判断用户是否有权限创建物品
 */
@Injectable()
export class RoleCreate implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
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
    if (!Utils.isExists(token)) return true;
    const userId = await Redis.get(token);
    if (Utils.isExists(userId)) {
      const user: UserEntity = await Redis.get(userId);
      if (user.create_goods === '1') {
        return false;
      }
    }
    return true;
  }
}
