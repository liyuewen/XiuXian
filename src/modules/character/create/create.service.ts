import { Injectable } from '@nestjs/common';
import KnapsackEntity from 'src/entity/knapsack.entity';
import { CommoditySourceEnum } from 'src/enum/commodity.enum';
import EntityCommon from 'src/common/typeorm/entityCommon';
import { KnapsackService } from '../knapsack/knapsack.service';

@Injectable()
export class CreateService {
  constructor(private knapsackService: KnapsackService) {}

  async createKnapsack(options: KnapsackEntity) {
    const knapsack = await EntityCommon.verifyEntity(new KnapsackEntity(), {
      ...options,
      source: CommoditySourceEnum.admin,
    });
    const result = await this.knapsackService.updateKnapsack(knapsack);
    return {
      id: result.id,
    };
  }
  
}
