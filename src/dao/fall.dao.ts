import { Injectable } from '@nestjs/common';
import FallEntity from 'src/entity/fall.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class FallDao {
  fall = this.dataSource.getRepository(FallEntity);

  constructor(private dataSource: DataSource) {}

  async createFall(values: Omit<FallEntity, 'id'>) {
    try {
      const equipment = await this.fall.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
