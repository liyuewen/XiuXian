import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import LoggerCommon from './common/logger/logger.service';
import { NestLoggerService } from './common/logger/nest-logger.service';
import Redis from './common/redis';
import { HttpFormatInterceptor } from './interceptor/http-format/http-format.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new HttpFormatInterceptor())
    app.useLogger(new NestLoggerService());
    Redis.createClient()
    await app.listen(3000, () => {
      LoggerCommon.info('Server is running on port http://127.0.0.1:3000');
    });
  } catch (error) {
    LoggerCommon.error(error);
  }
}
bootstrap();
