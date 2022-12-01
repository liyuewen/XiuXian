import { Global, Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Global()
@Module({
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
