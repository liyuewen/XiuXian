import { Injectable } from '@nestjs/common';
import EquipmentDao from 'src/dao/equipment.dao';
import EquipmentEntity from 'src/entity/equipment.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentDao: EquipmentDao) {}

  async createEquipment(options: Omit<EquipmentEntity, 'id'>) {
    await Utils.validateError(options, EquipmentEntity);
    const equipment = await this.equipmentDao.createEquipment(options);
    console.log(equipment, 'equipment');
    return true;
  }

  async getEquipmentList() {
    const equipmentList = await this.equipmentDao.getEquipmentList();
    console.log(equipmentList, 'equipmentList');
    return equipmentList;
  }
}
