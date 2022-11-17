import { LoggerService } from '@nestjs/common';
import LoggerCommon from './logger.service';

export class NestLoggerService implements LoggerService {
  log(message: string) {
    LoggerCommon.info(message);
  }
  error(message: string, trace: string) {
    LoggerCommon.error(`${message} \n ${trace}`);
  }
  warn(message: string) {
    LoggerCommon.warn(message);
  }
  debug(message: string) {
    LoggerCommon.debug(message);
  }
  verbose(message: string) {
    LoggerCommon.trace(message);
  }
}
