import { Injectable } from '@nestjs/common';
import EquipmentDao from 'src/dao/equipment.dao';
import EquipmentEntity from 'src/entity/equipment.entity';
import EntityCommon from 'src/common/typeorm/entityCommon';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentDao: EquipmentDao) {}

  async createEquipment(options: EquipmentEntity) {
    const values = await EntityCommon.verifyEntity(
      new EquipmentEntity(),
      options,
    );
    const result = await this.equipmentDao.createEquipment(values);
    return {
      id: result.id,
    };
  }

  async getEquipmentList() {
    const equipmentList = await this.equipmentDao.getEquipmentList();
    return equipmentList;
  }
}
