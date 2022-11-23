import { Module } from '@nestjs/common';
import FallDao from 'src/dao/fall.dao';
import KnapsackDao from 'src/dao/knapsack.dao';
import { CreateController } from './create.controller';
import { CreateService } from './create.service';

@Module({
  controllers: [CreateController],
  providers: [CreateService, KnapsackDao]
})
export class CreateModule {}
