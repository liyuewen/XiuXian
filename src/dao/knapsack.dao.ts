import { Injectable } from '@nestjs/common';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class KnapsackDao {
  constructor(private dataSource: DataSource) {}

  async createKnapsack(values: Omit<KnapsackEntity, 'id'>) {
    const dataSource = this.dataSource;
    const date = new Date();
    values.created_time = date;
    values.updated_time = date;
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .insert()
        .into(KnapsackEntity)
        .values(values)
        .execute();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }
}
