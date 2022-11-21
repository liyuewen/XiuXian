import { Module } from '@nestjs/common';
import MonsterDao from 'src/dao/monster.dao';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

@Module({
  controllers: [MonsterController],
  providers: [MonsterService, MonsterDao]
})
export class MonsterModule {}
