import { Injectable } from '@nestjs/common';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { PublicCommodityEntity } from 'src/entity/public/publicCommodity.entity';
import { DataSource } from 'typeorm';

export type KnapsackEntityType = Omit<
  KnapsackEntity & PublicCommodityEntity,
  'id' | 'public_commodity'
>;

@Injectable()
export default class KnapsackDao {
  knapsack = this.dataSource.getRepository(KnapsackEntity);

  constructor(private dataSource: DataSource) {}

  async createKnapsack(values: KnapsackEntityType) {
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
      return knapsack;
    } catch (error) {
      throw error;
    }
  }
}
