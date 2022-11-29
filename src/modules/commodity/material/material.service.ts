import { Injectable } from '@nestjs/common';
import MaterialDao, { MaterialEntityType } from 'src/dao/material.dao';
import MaterialEntity from 'src/entity/material.entity';
import { PublicCommodityEntity } from 'src/entity/public/public_commodity.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class MaterialService {
  constructor(private materialDao: MaterialDao) {}

  async createMaterial(values: PublicCommodityEntity) {
    await Utils.validateError(values, MaterialEntity);
    const date = new Date();
    const obj: MaterialEntityType = {
      public_commodity: values,
      created_at: date,
      updated_at: null,
      delete_at: null,
    };
    await this.materialDao.createMaterial(obj);
    return true;
  }

  async getMaterialById(id: number) {
    const material = await this.materialDao.getMaterialById(id);
    return material;
  }
}
