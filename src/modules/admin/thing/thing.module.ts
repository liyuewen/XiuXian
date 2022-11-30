import { Module } from '@nestjs/common';
import { ThingController } from './thing.controller';
import { ThingService } from './thing.service';

@Module({
  controllers: [ThingController],
  providers: [ThingService]
})
export class ThingModule {}
