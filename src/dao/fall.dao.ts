import { Injectable } from '@nestjs/common';
import FallEntity from 'src/entity/fall.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class FallDao {
  constructor(private dataSource: DataSource) {}

  async createFall(values: Omit<FallEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into(FallEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
