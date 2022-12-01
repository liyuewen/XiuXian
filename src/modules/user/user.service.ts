import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Utils from 'src/utils/utils';
import UserDao from 'src/dao/user.dao';
import CharacterDao from 'src/dao/character.dao';
import CharacterEntity from 'src/entity/character.entity';
import HttpError from 'src/common/error/httpError';
import AuthRedis from 'src/common/redis/auth';
import EntityCommon from 'src/utils/entityCommon';
import UserEntity from 'src/entity/user.entity';

// root uf854adqw666
@Injectable()
export class UserService {
  constructor(private userDao: UserDao, private characterDao: CharacterDao) {}

  async register(username: string, password: string, req: Request) {
    const user = await this.userDao.getUserName(username);
    if (user) {
      throw new HttpError('用户名已存在', 10011);
    }
    const ip = Utils.getIp(req);
    const passwordMd5 = this.passwordMd5(password);
    const date = new Date();
    const character = await EntityCommon.verifyEntity(new UserEntity(), {
      username: username,
      password: passwordMd5,
      registerIp: ip,
      commonIp: ip,
      lastLoginTime: date,
      createCommodity: '0',
    });
    const saveUser = await this.userDao.createUser(character);
    if (saveUser) {
      return {
        id: saveUser.id,
      };
    }
    throw new HttpError('注册失败，请重试', 10012);
  }

  async login(username: string, password: string, req: Request) {
    if (!Utils.isExists(username)) {
      throw new HttpError('请输入用户名');
    }
    if (!Utils.isExists(password)) {
      throw new HttpError('请输入密码');
    }
    const ip = Utils.getIp(req);
    const date = new Date();
    const passwordMd5 = this.passwordMd5(password);
    const user = await this.userDao.login(username, passwordMd5);
    if (!Utils.isExists(user)) {
      throw new HttpError('用户名或密码错误', 10013);
    }
    const token = Utils.token(user.id);
    if (user) {
      await this.userDao.updateUser(user.id, {
        lastLoginIp: ip,
        lastLoginTime: date,
      });
      await AuthRedis.delToken(user.id);
      await AuthRedis.setToken(token, user);
      return {
        token: token,
      };
    }
    throw new HttpError('登录失败', 10014);
  }

  async createCharacter(name: string, sex: number, req: Request) {
    const token = Utils.getHeaderToken(req);
    const createdBy = await AuthRedis.getToken(token);
    const character = await EntityCommon.verifyEntity(new CharacterEntity(), {
      name: name,
      xwLevel: 0,
      userId: createdBy.id,
      scienceLevel: 0,
      sex: sex,
      soulLevel: 0,
      xwExp: 0,
      scienceExp: 0,
      soulExp: 0,
      knapsackMaxCapacity: 20,
      attr: {
        attack: 10,
        defense: 5,
        hp: 100,
        spirit: 10,
        physicalStrength: 10,
        dexterous: 5,
        lucky: 5,
      },
    });
    const result = await this.characterDao.createCharacter(character);
    return {
      id: result.id,
    };
  }

  passwordMd5(password: string) {
    return Utils.cryptoJS.MD5(password).toString().toUpperCase();
  }
}
