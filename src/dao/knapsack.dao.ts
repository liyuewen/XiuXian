import { Injectable } from '@nestjs/common';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { PublicCommodityEntity } from 'src/entity/public/public_commodity.entity';
import { DataSource } from 'typeorm';

export type KnapsackEntityType = Omit<
  KnapsackEntity & PublicCommodityEntity,
  'id' | 'public_commodity'
>;

@Injectable()
export default class KnapsackDao {
  constructor(private dataSource: DataSource) {}

  async createKnapsack(values: KnapsackEntityType) {
    const dataSource = this.dataSource;
    const date = new Date();
    values.created_at = date;
    values.updated_at = date;
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .insert()
        .into<KnapsackEntityType>(KnapsackEntity)
        .values(values)
        .execute();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async getKnapsackList(character_id: number) {
    const dataSource = this.dataSource;
    try {
      const knapsack = await dataSource
        .createQueryBuilder<KnapsackEntityType>(KnapsackEntity, 'knapsack')
        .where('knapsack.character_id = :character_id', { character_id })
        .getMany();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async getKnapsack(character_id: number, commodity_id: number) {
    const dataSource = this.dataSource;
    try {
      const knapsack = await dataSource
        .createQueryBuilder<KnapsackEntityType>(KnapsackEntity, 'knapsack')
        .where('knapsack.character_id = :character_id', { character_id })
        .andWhere('knapsack.commodity_id = :commodity_id', { commodity_id })
        .orderBy('knapsack.quantity', 'ASC')
        .getOne();
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async updateKnapsack(values: Partial<KnapsackEntity>) {
    const dataSource = this.dataSource;
    values.updated_at = new Date();
    try {
      const knapsack = await dataSource
        .createQueryBuilder()
        .update<KnapsackEntityType>(KnapsackEntity)
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
