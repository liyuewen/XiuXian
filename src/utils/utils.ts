import { Request } from 'express';
import * as CryptoJS from 'crypto-js';

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
}
