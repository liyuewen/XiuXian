import { Injectable } from '@nestjs/common';
import AuthRedis from 'src/common/redis/auth';
import CharacterDao from 'src/dao/character.dao';
import Utils from 'src/utils/utils';

/**
 * 用于验证用户身份
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(private characterDao: CharacterDao) {}

  /**
   * 验证角色是否是当前token用户的角色
   * @param {string} token 登录token
   * @param {string} characterId 角色id
   * @return {boolean} 是否验证成功 [true:成功] [false:失败]
   */
  async validateCharacter(
    token: string,
    characterId: number,
  ): Promise<boolean> {
    const user = await AuthRedis.getToken(token);
    if (Utils.isExists(user)) {
      const character = await this.characterDao.getCharacterById(characterId);
      if (Utils.isExists(character)) {
        return character.userId === user.id;
      }
    }
    return false;
  }
}
