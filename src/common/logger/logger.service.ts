import { Injectable } from '@nestjs/common';
import log4js, { configure, getLogger } from 'log4js';
import { LoggerConfig } from '../../config/logger.config';

configure(LoggerConfig);

export default class LoggerService {
  private static logger: log4js.Logger = getLogger();

  static info(message: string) {
    this.logger.info(message);
  }

  static error(message: string) {
    this.logger.error(message);
  }

  static warn(message: string) {
    this.logger.warn(message);
  }

  static debug(message: string) {
    this.logger.debug(message);
  }

  static trace(message: string) {
    this.logger.trace(message);
  }

  static fatal(message: string) {
    this.logger.fatal(message);
  }
}
