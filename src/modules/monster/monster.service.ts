import { Injectable } from '@nestjs/common';
import MonsterDao from 'src/dao/monster.dao';
import MonsterEntity from 'src/entity/monster.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class MonsterService {
  constructor(private monsterDao: MonsterDao) {}

  async createMonster(options: Omit<MonsterEntity, 'id'>) {
    await Utils.validateError(options, MonsterEntity);
    await this.monsterDao.createMonster(options);
    return 'createMonster';
  }
}
