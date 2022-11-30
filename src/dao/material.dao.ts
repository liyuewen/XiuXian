import { Injectable } from '@nestjs/common';
import MaterialEntity from 'src/entity/material.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class MaterialDao {
  material = this.dataSource.getRepository(MaterialEntity);

  constructor(private dataSource: DataSource) {}

  async createMaterial(values: MaterialEntity) {
    try {
      const equipment = await this.material.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  async getMaterialById(id: number) {
    try {
      const equipment = await this.material.findOne({
        where: { id },
      });
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
