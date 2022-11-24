import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config/app.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception/http-exception.filter';
import { MapModule } from './modules/map/map.module';
import { RolesGuard } from './modules/auth/role_guard.service';
import { MonsterModule } from './modules/monster/monster.module';
import { FallModule } from './modules/fall/fall.module';
import { CommodityModule } from './modules/commodity/commodity.module';
import { CharacterModule } from './modules/character/character.module';
import { DaoModule } from './dao/dao.module';

@Module({
  imports: [
    UserModule,
    MapModule,
    CommodityModule,
    MonsterModule,
    FallModule,
    CharacterModule,
    DaoModule,
    TypeOrmModule.forRoot(AppConfig.mysql),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
