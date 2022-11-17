import redis, { createClient } from 'redis';
import { AppConfig } from 'src/config/app.config';
import LoggerService from '../logger/logger.service';

export default class Redis {
  private static client: any;

  static async createClient() {
    try {
      this.client = createClient(AppConfig.redis);

      this.client.on('error', (error) => {
        LoggerService.error(error);
      });
      await this.client.connect();
    } catch (error) {
      LoggerService.error(error);
    }
  }

  public static async get(key: string | number) {
    try {
      let res = await this.client.get(String(key));
      if (res) {
        return JSON.parse(res);
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 设置redis
   * @param key  键
   * @param value  值
   * @param expire  过期时间
   * @returns
   */
  public static set(key: string | number, value: any, expire?: number) {
    return new Promise(async (resolve, reject) => {
      try {
        let obj: redis.SetOptions = {};
        if (expire) {
          obj.EX = expire;
        }
        let res = await this.client.set(String(key), JSON.stringify(value), obj);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static del(key: string | number) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this.client.del(String(key));
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
