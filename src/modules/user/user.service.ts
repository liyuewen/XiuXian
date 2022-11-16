import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Utils from 'src/utils/utils';
import ResultFormat from 'src/common/format/result';
import UserDao from 'src/dao/user.dao';
import CharacterDao from 'src/dao/character.dao';
import CharacterEntity from 'src/entity/character.entity';
import Redis from 'src/common/redis';
import HttpError from 'src/common/error/http-error';

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
      created_time: date,
      updated_time: date,
      register_ip: ip,
      common_ip: ip,
      character_id: 0,
      last_login_time: date,
    });
    if (saveUser) {
      return true;
    }
    throw new HttpError('注册失败，请重试', 10013);
  }

  async login(username: string, password: string, req: Request) {
    const ip = Utils.getIp(req);
    const date = new Date();
    const passwordMd5 = this.passwordMd5(password);
    const user = await this.userDao.login(username, passwordMd5);
    if (user) {
      await this.userDao.updateUser(user.id, {
        last_login_ip: ip,
        last_login_time: date,
      });
      const token = Utils.token(user.id);
      await Redis.set(token, user.id, 60 * 60 * 24 * 7);
      return {
        token: token,
      };
    }
    throw new HttpError('用户名或密码错误', 10012);
  }

  async createCharacter(name: string, sex: number) {
    const obj = new CharacterEntity();
    obj.name = name;
    obj.sex = sex;
    await Utils.validateError(obj);
    await this.characterDao.createCharacter({
      name: obj.name,
      equipment_id: '',
      xw_level: 0,
      kj_level: 0,
      sex: obj.sex,
      attack: 10,
      defense: 5,
      hp: 100,
      spirit: 10,
      physical_strength: 10,
      dexterous: 5,
      lucky: 5,
      soul_level: 0,
      xw_exp: 0,
      kj_exp: 0,
      soul_exp: 0,
    });
    return true;
  }

  passwordMd5(password: string) {
    return Utils.cryptoJS.MD5(password).toString().toUpperCase();
  }
}
