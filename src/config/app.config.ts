import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface AppConfigType {
  mysql: TypeOrmModuleOptions;
}

export const AppConfig: AppConfigType = {
  mysql: {
    type: 'mysql',
    host: '43.142.50.90',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'games',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true
  },
};
