import { Module } from '@nestjs/common';
import { CreateModule } from './create/create.module';
import { KnapsackModule } from './knapsack/knapsack.module';

@Module({
  imports: [CreateModule, KnapsackModule]
})
export class CharacterModule {}
