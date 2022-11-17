import { Injectable } from '@nestjs/common';
import EquipmentEntity from 'src/entity/equipment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class EquipmentDao {
  constructor(private dataSource: DataSource) {}

  async createEquipment(values: Omit<EquipmentEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into(EquipmentEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
