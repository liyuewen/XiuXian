import UserEntity from 'src/entity/user.entity';
import Utils from 'src/utils/utils';
import Redis from '.';
import ThrowError from '../error/throw_error';

export default class AuthRedis extends Redis {
  /**
   * 保存用户token
   */
  static async setToken(token: string, user: UserEntity) {
    try {
      if (!Utils.isExists(user)) {
        throw 'user不存在';
      }
      await Redis.set(token, user.id, 60 * 60 * 24 * 7);
      await Redis.set(user.id, { ...user, token: token }, 60 * 60 * 24 * 7);
    } catch (error) {
      throw new ThrowError(`redis:setToken失败${error}`);
    }
  }

  /**
   * 获取用户id
   * @param token
   * @returns
   */
  static async getToken(token: string) {
    if (!Utils.isExists(token)) return null;
    const userId = await Redis.get(token);
    if (Utils.isExists(userId)) {
      const user: UserEntity = await Redis.get(userId);
      return user;
    }
    return null;
  }

  static async delToken(userId: number) {
    try {
      if (Utils.isExists(userId)) return true;
      const userRedis = await Redis.get(userId);
      if (Utils.isExists(userRedis)) {
        await Redis.del(userRedis.token);
        await Redis.del(userId);
      }
      return true;
    } catch (error) {
      throw new ThrowError(`redis:delToken失败${error}`);
    }
  }
}
