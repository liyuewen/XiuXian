import { Injectable } from '@nestjs/common';
import MaterialEntity from 'src/entity/material.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class MaterialDao {
  constructor(private dataSource: DataSource) {}

  async createMaterial(values: Omit<MaterialEntity, 'id'>) {
    const dataSource = this.dataSource;

    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into(MaterialEntity)
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
        .createQueryBuilder(MaterialEntity, 'material')
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
