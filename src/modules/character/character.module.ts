import { Module } from '@nestjs/common';
import { CreateModule } from './create/create.module';
import { KnapsackModule } from './knapsack/knapsack.module';
import { OperateModule } from './operate/operate.module';
import { ExpModule } from './exp/exp.module';

@Module({
  imports: [CreateModule, KnapsackModule, OperateModule, ExpModule]
})
export class CharacterModule {}
