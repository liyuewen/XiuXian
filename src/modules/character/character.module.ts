import { Module } from '@nestjs/common';
import { CreateModule } from './create/create.module';

@Module({
  imports: [CreateModule]
})
export class CharacterModule {}
