import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import redis from 'redis';

interface AppConfigType {
  mysql: TypeOrmModuleOptions;
  redis: redis.RedisClientOptions<
    redis.RedisModules,
    redis.RedisFunctions,
    redis.RedisScripts
  >;
  jwtConstants: {
    jwtKey: string;
  };
}

export const AppConfig: AppConfigType = {
  mysql: {
    type: 'mysql',
    host: '43.142.50.90',
    port: 3306,
    username: 'lyw',
    password: '123456',
    database: 'games',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true,
  },
  redis: {
    url: 'redis://43.142.50.90:6379',
  },
  jwtConstants: {
    jwtKey: 'secretKey',
  },
};
