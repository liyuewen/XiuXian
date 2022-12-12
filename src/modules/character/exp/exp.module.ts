import { Module } from '@nestjs/common';
import { ExpController } from './exp.controller';
import { ExpService } from './exp.service';

@Module({
  controllers: [ExpController],
  providers: [ExpService]
})
export class ExpModule {}
