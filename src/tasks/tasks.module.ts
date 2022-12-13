import { Module } from '@nestjs/common';
import { CultivationService } from './cultivation/cultivation.service';

@Module({
  providers: [CultivationService],
})
export class TasksModule {}
