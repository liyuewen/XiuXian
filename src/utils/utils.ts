import { Request } from 'express';
import * as CryptoJS from 'crypto-js';
import { validate, ValidationError } from 'class-validator';

export default class Utils {
  static cryptoJS = CryptoJS;

  static getIp(req: Request) {
    const ip =
      req.headers['Client-IP'] || req.headers['x-forwarded-for'] || req.ip;
    return ip.toString().replace(/^.*:/, '');
  }

  static isExists<T>(data: T): data is NonNullable<T> {
    if (!data) return false;
    if (JSON.stringify(data) === '{}') return false;
    if (JSON.stringify(data) === '[]') return false;
    return true;
  }

  /**
   * 生成随机数
   */
  static randomNum(max = 32) {
    let chars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    let nums = '';
    for (let i = 0; i < max; i++) {
      let id = parseInt(String(Math.random() * 61));
      nums += chars[id];
    }
    return nums;
  }

  /**
   * 用于返回当前实体的验证错误第一条错误信息
   * @param object 实体
   * @returns 
   */
  static async validateError(object: object) {
    const val = await validate(object);
    if (val.length > 0) {
      let validation = val[0];
      let errors = Object.values(validation.constraints);
      throw errors[0];
    }
    return '';
  }

  static token(id: number) {
    const time = new Date().getTime().toString();
    const num = this.randomNum(32);
    const md5 = this.cryptoJS.MD5(time + num + id).toString();
    return md5 + num;
  }
}
