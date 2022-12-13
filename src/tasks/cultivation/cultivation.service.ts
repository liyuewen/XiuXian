import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CultivationService {
  private readonly logger = new Logger(CultivationService.name);

  @Cron('* * * * * *')
  handleCron() {
    // this.logger.debug('每秒触发一次');
  }
}