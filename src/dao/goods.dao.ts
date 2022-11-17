import { Injectable } from '@nestjs/common';
import GoodsEntity from 'src/entity/goods.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class GoodsDao {
  constructor(private dataSource: DataSource) {}

  async createGoods(values: Omit<GoodsEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const goods = await dataSource
        .createQueryBuilder()
        .insert()
        .into(GoodsEntity)
        .values(values)
        .execute();
      return goods;
    } catch (error) {
      throw error;
    }
  }
}
