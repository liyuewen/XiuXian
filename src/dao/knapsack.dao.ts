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

  async getKnapsackList(values: Partial<KnapsackEntity>) {
    const dataSource = this.dataSource;
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .select()
        .from(KnapsackEntity, 'knapsack')
        .where('knapsack.character_id = :character_id', {
          character_id: values.character_id,
        })
        .getMany();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async getKnapsack(values: Partial<KnapsackEntity>) {
    const dataSource = this.dataSource;
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .select()
        .from(KnapsackEntity, 'knapsack')
        .where('knapsack.character_id = :character_id', {
          character_id: values.character_id,
        })
        .andWhere('knapsack.commodity_id = :commodity_id', {
          commodity_id: values.commodity_id,
        })
        .getOne();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async updateKnapsack(values: Partial<KnapsackEntity>) {
    const dataSource = this.dataSource;
    values.updated_time = new Date();
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .update(KnapsackEntity)
        .set(values)
        .where('id = :id', {
          id: values.id,
        })
        .execute();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

}
