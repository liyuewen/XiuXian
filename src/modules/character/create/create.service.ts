import { Injectable } from '@nestjs/common';
import KnapsackDao from 'src/dao/knapsack.dao';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { GoodsSourceEnum } from 'src/enum/goods.enum';
import Utils from 'src/utils/utils';

@Injectable()
export class CreateService {
  constructor(private knapsackDao: KnapsackDao) {}

  async createKnapsack(values: Omit<KnapsackEntity, 'id'>) {
    if (Utils.isObject(values)) {
      values.source = GoodsSourceEnum.admin;
    }
    await Utils.validateError(values, KnapsackEntity);
    const fall = await this.knapsackDao.createKnapsack(values);
    return true;
  }
}
