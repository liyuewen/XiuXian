import { Module } from '@nestjs/common';
import { OperateController } from './operate.controller';
import { OperateService } from './operate.service';

@Module({
  controllers: [OperateController],
  providers: [OperateService]
})
export class OperateModule {}
