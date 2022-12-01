import { Module } from '@nestjs/common';
import { CreateModule } from './create/create.module';
import { KnapsackModule } from './knapsack/knapsack.module';
import { OperateModule } from './operate/operate.module';

@Module({
  imports: [CreateModule, KnapsackModule, OperateModule]
})
export class CharacterModule {}
