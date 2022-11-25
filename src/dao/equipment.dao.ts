import { Injectable } from '@nestjs/common';
import { PublicAttrEntity } from 'src/entity/public/public_attr.entity';
import { PublicCommodityEntity } from 'src/entity/public/public_commodity.entity';
import EquipmentEntity from 'src/entity/equipment.entity';
import { DataSource } from 'typeorm';

export type EquipmentEntityType = Omit<
  EquipmentEntity & PublicCommodityEntity & PublicAttrEntity,
  'id' | 'public_commodity' | 'public_attr'
>;

@Injectable()
export default class EquipmentDao {
  constructor(private dataSource: DataSource) {}

  async createEquipment(values: Omit<EquipmentEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into<EquipmentEntityType>(EquipmentEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentList() {
    const dataSource = this.dataSource;
    try {
      const equipmentList = await dataSource
        .getRepository<EquipmentEntityType>(EquipmentEntity)
        .createQueryBuilder('user')
        .getMany();
      return equipmentList;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentById(id: number) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder<EquipmentEntityType>(EquipmentEntity, 'equipment')
        .where('equipment.id = :id', { id })
        .getOne();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
