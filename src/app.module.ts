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
import { RolesGuard } from './modules/auth/role-guard.service';

@Module({
  imports: [
    UserModule,
    MapModule,
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
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
