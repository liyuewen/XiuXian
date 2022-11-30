import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleAdmin } from '../auth/roleAdmin.service';
import { ThingModule } from './thing/thing.module';

@Module({
  imports: [ThingModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleAdmin,
    },
  ],
})
export class AdminModule {}
