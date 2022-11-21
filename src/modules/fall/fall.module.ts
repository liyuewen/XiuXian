import { Module } from '@nestjs/common';
import { FallService } from './fall.service';
import { FallController } from './fall.controller';
import FallDao from 'src/dao/fall.dao';

@Module({
  providers: [FallService, FallDao],
  controllers: [FallController]
})
export class FallModule {}
