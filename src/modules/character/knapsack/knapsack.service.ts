import { Injectable } from '@nestjs/common';
import KnapsackDao, { KnapsackEntityType } from 'src/dao/knapsack.dao';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { CommodityService } from 'src/modules/commodity/commodity.service';
import Utils from 'src/utils/utils';

@Injectable()
export class KnapsackService {
  constructor(
    private knapsackDao: KnapsackDao,
    private commodityService: CommodityService,
  ) {}

  /**
   * 先取出当前背包中的当前物品，如果没有则创建一个新的物品
   * 如果当前背包中的当前物品数量小于最大数量，则增加数量,增加后的数量如果
   * 如果当前背包中的当前物品数量等于最大数量，则插入一个新的
   */
  async updateKnapsack(values: KnapsackEntityType) {
    const knapsack = await this.knapsackDao.getKnapsackCommodity(
      values.commodityId,
      values.characterId,
    );
    let knapsackCommodity!: KnapsackEntity;
    if (knapsack.length > 0) {
      knapsackCommodity = knapsack[0];
    }
    if (Utils.isExists(knapsackCommodity)) {
      const max_quantity = await this.commodityService.getCommodityMaxQuantity(
        values.commodityId,
        values.commodityType,
      );
      const quantity = knapsackCommodity.quantity + values.quantity;
      const diffQuantity = quantity - max_quantity;

      if (diffQuantity <= 0) {
        knapsackCommodity.quantity = quantity;
        await this.knapsackDao.updateKnapsack(knapsackCommodity);
      }
      if (diffQuantity > 0) {
        knapsackCommodity.quantity = max_quantity;
        await this.knapsackDao.updateKnapsack(knapsackCommodity);
        values.quantity = diffQuantity;
        await this.knapsackDao.createKnapsack(values);
      }
    } else {
      await this.knapsackDao.createKnapsack(values);
    }
    return true;
  }

  /**
   * 取出当前角色背包中的所有物品
   */
  async arrangementKnapsack(character_id: number) {}
}
