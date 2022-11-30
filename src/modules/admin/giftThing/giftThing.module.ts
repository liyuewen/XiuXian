import { Module } from '@nestjs/common';
import { GiftThingController } from './giftThing.controller';
import { GiftThingService } from './giftThing.service';

@Module({
  controllers: [GiftThingController],
  providers: [GiftThingService]
})
export class GiftThingModule {}
