import { Injectable } from '@nestjs/common';
import MaterialDao from 'src/dao/material.dao';
import MaterialEntity from 'src/entity/material.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class MaterialService {
  constructor(private materialDao: MaterialDao) {}

  async createMaterial(values: Omit<MaterialEntity, 'id'>) {
    await Utils.validateError(values, MaterialEntity);
    await this.materialDao.createMaterial(values);
    return true
  }
}
