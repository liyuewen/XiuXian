import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Utils from 'src/utils/utils';
import UserDao from 'src/dao/user.dao';
import CharacterDao from 'src/dao/character.dao';
import CharacterEntity from 'src/entity/character.entity';
import Redis from 'src/common/redis';
import HttpError from 'src/common/error/http_error';
import AuthRedis from 'src/common/redis/auth';
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
    const saveUser = await this.userDao.createUser({
      username: username,
      password: passwordMd5,
      created_at: date,
      updated_at: date,
      register_ip: ip,
      common_ip: ip,
      character_id: 0,
      last_login_time: date,
      create_commodity: '0',
    });
    if (saveUser) {
      return true;
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
        last_login_ip: ip,
        last_login_time: date,
      });
      await AuthRedis.delToken(user.id);
      await AuthRedis.setToken(token, user);
      return {
        token: token,
      };
    }
    throw new HttpError('登录失败', 10014);
  }

  async createCharacter(name: string, sex: number) {
    await Utils.validateError({ name, sex }, CharacterEntity);
    const date = new Date();
    await this.characterDao.createCharacter({
      name: name,
      xw_level: 0,
      kj_level: 0,
      sex: sex,
      soul_level: 0,
      xw_exp: 0,
      kj_exp: 0,
      soul_exp: 0,
      knapsack_max: 20,
      created_at: date,
      updated_at: date,
      public_attr: {
        attack: 10,
        defense: 5,
        hp: 100,
        spirit: 10,
        physical_strength: 10,
        dexterous: 5,
        lucky: 5,
      },
    });
    return true;
  }

  passwordMd5(password: string) {
    return Utils.cryptoJS.MD5(password).toString().toUpperCase();
  }
}
