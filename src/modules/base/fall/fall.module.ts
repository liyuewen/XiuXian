import { Module } from '@nestjs/common';
import { FallService } from './fall.service';
import { FallController } from './fall.controller';

@Module({
  providers: [FallService],
  controllers: [FallController]
})
export class FallModule {}
