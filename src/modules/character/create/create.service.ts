import { Injectable } from '@nestjs/common';
import KnapsackDao from 'src/dao/knapsack.dao';
import KnapsackEntity from 'src/entity/knapsack.entity';
import {
  CommoditySourceEnum,
  CommodityTypeEnum,
} from 'src/enum/commodity.enum';
import { CommodityService } from 'src/modules/commodity/commodity.service';
import Utils from 'src/utils/utils';

@Injectable()
export class CreateService {
  constructor(
    private knapsackDao: KnapsackDao,
    private commodityService: CommodityService,
  ) {}

  /**
   * 先取出当前背包中的当前物品，如果没有则创建一个新的
   * 如果当前背包中的当前物品数量小于最大数量，则增加数量
   * 如果当前背包中的当前物品数量等于最大数量，则插入一个新的
   */
  async createKnapsack(values: Omit<KnapsackEntity, 'id'>) {
    if (Utils.isObject(values)) {
      values.source = CommoditySourceEnum.admin;
    }
    await Utils.validateError(values, KnapsackEntity);
    const knapsack = await this.knapsackDao.getKnapsack(values);
    const max_quantity = await this.commodityService.getCommodityMaxQuantity(
      values.commodity_id,
      values.commodity_type,
    );
    if (knapsack) {
      if (knapsack.quantity < max_quantity) {
        knapsack.quantity += values.quantity;
        await this.knapsackDao.updateKnapsack(knapsack);
      } else {
        await this.knapsackDao.createKnapsack(values);
      }
    }
    return true;
  }
}
