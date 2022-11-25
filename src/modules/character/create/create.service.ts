import { Injectable } from '@nestjs/common';
import { KnapsackEntityType } from 'src/dao/knapsack.dao';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { CommoditySourceEnum } from 'src/enum/commodity.enum';
import Utils from 'src/utils/utils';
import { KnapsackService } from '../knapsack/knapsack.service';

@Injectable()
export class CreateService {
  constructor(private knapsackService: KnapsackService) {}

  async createKnapsack(values: KnapsackEntityType) {
    if (Utils.isObject(values)) {
      values.source = CommoditySourceEnum.admin;
    }
    await Utils.validateError(values, KnapsackEntity);
    await this.knapsackService.updateKnapsack(values);
    return true;
  }
}
