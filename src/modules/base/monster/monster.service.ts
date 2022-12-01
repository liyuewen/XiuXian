import { Injectable } from '@nestjs/common';
import MonsterDao from 'src/dao/monster.dao';
import MonsterEntity from 'src/entity/monster.entity';
import EntityCommon from 'src/common/typeorm/entityCommon';
import Utils from 'src/utils/utils';

@Injectable()
export class MonsterService {
  constructor(private monsterDao: MonsterDao) {}

  async createMonster(options: Omit<MonsterEntity, 'id'>) {
    const values = await EntityCommon.verifyEntity(new MonsterEntity(), options);
    const result = await this.monsterDao.createMonster(values);
    return {
      id: result.id,
    };
  }
}
