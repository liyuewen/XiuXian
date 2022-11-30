import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleAdmin } from '../auth/roleAdmin.service';
import { GiftThingModule } from './giftThing/giftThing.module';

@Module({
  imports: [GiftThingModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleAdmin,
    },
  ],
})
export class AdminModule {}
