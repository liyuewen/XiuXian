import { Global, Module } from '@nestjs/common';
import { KnapsackController } from './knapsack.controller';
import { KnapsackService } from './knapsack.service';

@Global()
@Module({
  controllers: [KnapsackController],
  providers: [KnapsackService],
  exports: [KnapsackService],
})
export class KnapsackModule {}
