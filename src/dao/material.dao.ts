import { Injectable } from '@nestjs/common';
import MaterialEntity from 'src/entity/material.entity';
import { PublicCommodityEntity } from 'src/entity/public/public_commodity.entity';
import { DataSource } from 'typeorm';

export type MaterialEntityType = Omit<
  MaterialEntity & PublicCommodityEntity,
  'id' | 'public_commodity'
>;

@Injectable()
export default class MaterialDao {
  constructor(private dataSource: DataSource) {}

  async createMaterial(values: Omit<MaterialEntity, 'id'>) {
    const dataSource = this.dataSource;

    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into<MaterialEntityType>(MaterialEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  async getMaterialById(id: number) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder<MaterialEntityType>(MaterialEntity, 'material')
        .where('material.id = :id', {
          id,
        })
        .getOne();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
