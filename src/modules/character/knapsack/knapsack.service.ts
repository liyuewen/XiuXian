import { Injectable } from '@nestjs/common';
import KnapsackDao from 'src/dao/knapsack.dao';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { CommodityService } from 'src/modules/base/thing/commodity.service';
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
  async updateKnapsack(options: KnapsackEntity) {
    const knapsack = await this.knapsackDao.getKnapsackCommodity(
      options.commodityId,
      options.characterId,
    );
    let knapsackCommodity!: KnapsackEntity;
    if (knapsack.length > 0) {
      knapsackCommodity = knapsack[0];
    }
    let result: KnapsackEntity = null;
    if (Utils.isExists(knapsackCommodity)) {
      const max_quantity = await this.commodityService.getCommodityMaxQuantity(
        options.commodityId,
        options.commodityType,
      );
      const quantity = knapsackCommodity.quantity + options.quantity;
      const diffQuantity = quantity - max_quantity;

      if (diffQuantity <= 0) {
        knapsackCommodity.quantity = quantity;
        result = await this.knapsackDao.updateKnapsack(knapsackCommodity);
      }
      if (diffQuantity > 0) {
        knapsackCommodity.quantity = max_quantity;
        result = await this.knapsackDao.updateKnapsack(knapsackCommodity);
        options.quantity = diffQuantity;
        result = await this.knapsackDao.createKnapsack(options);
      }
    } else {
      result = await this.knapsackDao.createKnapsack(options);
    }
    return result;
  }

  /**
   * 取出当前角色背包中的所有物品
   */
  async arrangementKnapsack(character_id: number) {}
}
