import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './config/app.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/httpException/httpException.filter';
import { MapModule } from './modules/base/map/map.module';
import { RolesGuard } from './modules/auth/roleGuard.service';
import { MonsterModule } from './modules/base/monster/monster.module';
import { FallModule } from './modules/base/fall/fall.module';
import { CommodityModule } from './modules/base/thing/commodity.module';
import { CharacterModule } from './modules/character/character.module';
import { DaoModule } from './dao/dao.module';
import { MailModule } from './modules/mail/mail.module';
import { AdminModule } from './modules/admin/admin.module';
import { SocketModule } from './socket/socket.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DaoModule,
    UserModule,
    MapModule,
    CommodityModule,
    MonsterModule,
    FallModule,
    CharacterModule,
    MailModule,
    AdminModule,
    SocketModule,
    TasksModule,
    ScheduleModule.forRoot(),
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
