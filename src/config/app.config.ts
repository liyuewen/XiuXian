import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface AppConfigType {
  mysql: TypeOrmModuleOptions;
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
    synchronize: true
  },
};
