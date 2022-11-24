import { Module } from '@nestjs/common';
import { KnapsackController } from './knapsack.controller';
import { KnapsackService } from './knapsack.service';

@Module({
  controllers: [KnapsackController],
  providers: [KnapsackService]
})
export class KnapsackModule {}
