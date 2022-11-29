import { Injectable } from '@nestjs/common';
import MonsterEntity from 'src/entity/monster.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class MonsterDao {
  monster = this.dataSource.getRepository(MonsterEntity);

  constructor(private dataSource: DataSource) {}

  async createMonster(values: Omit<MonsterEntity, 'id'>) {
    try {
      const equipment = await this.monster.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
