import { configure } from 'log4js';
import { LoggerConfig } from '../../config/logger.config';

const config = configure(LoggerConfig);

const logger = config.getLogger();

export default class LoggerService {

  static info(message: string) {
    logger.info(message);
  }

  static error(message: string) {
    logger.error(message);
  }

  static warn(message: string) {
    logger.warn(message);
  }

  static debug(message: string) {
    logger.debug(message);
  }

  static trace(message: string) {
    logger.trace(message);
  }

  static fatal(message: string) {
    logger.fatal(message);
  }
}
