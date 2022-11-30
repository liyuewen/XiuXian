import { Injectable } from '@nestjs/common';
import { PublicAttrEntity } from 'src/entity/public/publicAttr.entity';
import { PublicCommodityEntity } from 'src/entity/public/publicCommodity.entity';
import EquipmentEntity from 'src/entity/equipment.entity';
import { DataSource } from 'typeorm';

export type EquipmentEntityType = Omit<
  EquipmentEntity & PublicCommodityEntity & PublicAttrEntity,
  'id' | 'public_commodity' | 'public_attr'
>;

@Injectable()
export default class EquipmentDao {
  equipment = this.dataSource.getRepository(EquipmentEntity);

  constructor(private dataSource: DataSource) {}

  async createEquipment(values: Omit<EquipmentEntity, 'id'>) {
    try {
      const equipment = await this.equipment.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentList() {
    try {
      const equipmentList = await this.equipment.find();
      return equipmentList;
    } catch (error) {
      throw error;
    }
  }

  async getEquipmentById(id: number) {
    try {
      const equipment = await this.equipment.findOne({
        where: { id },
      });
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
