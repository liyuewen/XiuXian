import { Module } from '@nestjs/common';
import { GiftThingModule } from './giftThing/giftThing.module';

@Module({
  imports: [GiftThingModule],
})
export class AdminModule {}
