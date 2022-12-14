import { NestFactory } from '@nestjs/core';
import WsAdapters from './adapters/ws.adapters';
import { AppModule } from './app.module';
import LoggerCommon from './common/logger/logger.service';
import { NestLoggerService } from './common/logger/nestLogger.service';
import Redis from './common/redis';
import { AppConfig } from './config/app.config';
import { HttpFormatInterceptor } from './interceptor/httpFormat/httpFormat.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await Redis.createClient();
    app.useWebSocketAdapter(new WsAdapters(app));
    app.useGlobalInterceptors(new HttpFormatInterceptor());
    app.useLogger(new NestLoggerService());
    await app.listen(3000, () => {
      LoggerCommon.info('Server is running on port http://127.0.0.1:3000');
      LoggerCommon.info(`Server is running on port ws://127.0.0.1:${AppConfig.ws.port}${AppConfig.ws.path}`);
    });
  } catch (error) {
    LoggerCommon.error(error);
  }
}
bootstrap();
