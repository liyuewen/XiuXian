import { Global, Module } from '@nestjs/common';
import AttributeDao from './attribute.dao';
import CharacterDao from './character.dao';
import DesignDrawingDao from './designDrawing.dao';
import EquipmentDao from './equipment.dao';
import FallDao from './fall.dao';
import GameMapDao from './gameMap.dao';
import KnapsackDao from './knapsack.dao';
import MailDao from './mail.dao';
import MaterialDao from './material.dao';
import MonsterDao from './monster.dao';
import SynthesisDao from './synthesis.dao';
import UserDao from './user.dao';

@Global()
@Module({
  providers: [
    MaterialDao,
    EquipmentDao,
    AttributeDao,
    CharacterDao,
    FallDao,
    GameMapDao,
    KnapsackDao,
    MonsterDao,
    SynthesisDao,
    UserDao,
    DesignDrawingDao,
    MailDao
  ],
  exports: [
    MaterialDao,
    EquipmentDao,
    AttributeDao,
    CharacterDao,
    FallDao,
    GameMapDao,
    KnapsackDao,
    MonsterDao,
    SynthesisDao,
    UserDao,
    DesignDrawingDao,
    MailDao
  ],
})
export class DaoModule {}
