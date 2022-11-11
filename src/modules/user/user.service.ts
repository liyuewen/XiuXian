import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Utils from 'src/utils/utils';
import ResultFormat from 'src/common/format/result';
import UserDao from 'src/dao/user.dao';
import CharacterDao from 'src/dao/character.dao';
import Regular from 'src/utils/regular';
import { validate, validateSync } from 'class-validator';
import CharacterEntity from 'src/entity/character.entity';

@Injectable()
export class UserService {
  constructor(private userDao: UserDao, private characterDao: CharacterDao) {}

  async register(username: string, password: string, req: Request) {
    try {
      const user = await this.userDao.getUserName(username);
      if (user) {
        return ResultFormat.success({
          statusCode: 10011,
          message: '用户名已存在',
        });
      }
      const ip = Utils.getIp(req);
      const passwordMd5 = this.passwordMd5(password);
      const saveUser = await this.userDao.createUser({
        username: username,
        password: passwordMd5,
        created_time: new Date(),
        updated_time: new Date(),
        register_ip: ip,
        common_ip: ip,
        character_id: 0,
        last_login_time: new Date(),
      });
      if (saveUser) {
        return ResultFormat.success({
          data: true,
          message: '注册成功',
        });
      }
      return ResultFormat.success({
        message: '注册失败，请重试',
      });
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string, req: Request) {
    try {
      const ip = Utils.getIp(req);
      const passwordMd5 = this.passwordMd5(password);
      const user = await this.userDao.login(username, passwordMd5);
      if (user) {
        return ResultFormat.success({
          data: true,
          message: '登录成功',
        });
      }
      return ResultFormat.success({
        statusCode: 10021,
        message: '用户名或密码错误',
      });
    } catch (error) {
      throw error;
    }
  }

  async createCharacter(name: string, sex: number) {
    try {
      if (!Regular.IS_CHINESE_ENGLISH_NUMBERS.test(name)) {
        return ResultFormat.success({
          statusCode: 10031,
          message: '角色名只能是中文、英文、数字',
        });
      }
      const obj = new CharacterEntity();
      obj.name = name;
      obj.sex = sex
      let verify = await validate(obj)
      console.log(verify);
      
      // const character = await this.characterDao.createCharacter({
      //   name: name,
      //   equipment_id: '',
      //   xw_level: 0,
      //   kj_level: 0,
      //   sex: sex,
      //   attack: 10,
      //   defense: 5,
      //   hp: 100,
      //   spirit: 10,
      //   physical_strength: 10,
      //   dexterous: 5,
      //   lucky: 5,
      //   soul_level: 0,
      //   xw_exp: 0,
      //   kj_exp: 0,
      //   soul_exp: 0,
      // });
      
      return ResultFormat.success({
        data: true,
        message: '创建成功',
      });
    } catch (error) {
      throw error;
    }
  }

  passwordMd5(password: string) {
    return Utils.cryptoJS.MD5(password).toString().toUpperCase();
  }
}
