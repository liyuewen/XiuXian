import { Injectable } from '@nestjs/common';
import MonsterEntity from 'src/entity/monster.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class MonsterDao {
  constructor(private dataSource: DataSource) {}

  async createMonster(values: Omit<MonsterEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into(MonsterEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
