import { Injectable } from '@nestjs/common';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class KnapsackDao {
  knapsack = this.dataSource.getRepository(KnapsackEntity);

  constructor(private dataSource: DataSource) {}

  async createKnapsack(values: KnapsackEntity) {
    try {
      const knapsack = await this.knapsack.save(values);
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async getKnapsackListByCharacterId(characterId: number) {
    try {
      const knapsack = await this.knapsack.find({
        where: {
          characterId,
        },
      });
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async getKnapsackCommodity(characterId: number, commodityId: number) {
    try {
      const knapsack = await this.knapsack.find({
        where: {
          characterId,
          commodityId,
        },
        order: {
          quantity: 'ASC',
        },
      });
      return knapsack;
    } catch (error) {
      throw error;
    }
  }

  async updateKnapsack(values: Partial<KnapsackEntity>) {
    try {
      const knapsack = await this.knapsack.update(values.id, values);
      return knapsack.raw;
    } catch (error) {
      throw error;
    }
  }
}
