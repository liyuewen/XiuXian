import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import redis from 'redis';

interface AppConfigType {
  mysql: TypeOrmModuleOptions;
  redis: redis.RedisClientOptions<
    redis.RedisModules,
    redis.RedisFunctions,
    redis.RedisScripts
  >;
}

export const AppConfig: AppConfigType = {
  mysql: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'games',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true,
  },
  redis: {
    url: 'redis://127.0.0.1:6379',
  }
};
