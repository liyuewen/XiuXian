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
   * 是否是对象
   * @param value
   * @returns
   */
  static isObject(value: any): value is Object {
    return Object.prototype.toString.call(value) == '[object Object]';
  }

  /**
   * 是否数组
   * @param value
   * @returns
   */
  static isArray<T extends Array<any>>(value: T | any): value is T {
    return Object.prototype.toString.call(value) == '[object Array]';
  }

  /**
   * 是否是数字
   * @param value
   * @returns
   */
  static isNumber(value: any): value is Number {
    return Object.prototype.toString.call(value) == '[object Number]';
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

  static token(id: number) {
    const time = new Date().getTime().toString();
    const num = this.randomNum(32);
    const md5 = this.cryptoJS.MD5(time + num + id).toString();
    return md5 + num;
  }

  static getHeaderToken(req: Request) {
    const token = req.headers['token'];
    if (!token) return '';
    return token.toString();
  }
}
