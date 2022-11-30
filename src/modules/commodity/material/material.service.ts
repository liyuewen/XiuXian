import { Injectable } from '@nestjs/common';
import MaterialDao, { MaterialEntityType } from 'src/dao/material.dao';
import MaterialEntity from 'src/entity/material.entity';
import { PublicCommodityEntity } from 'src/entity/public/publicCommodity.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class MaterialService {
  constructor(private materialDao: MaterialDao) {}

  async createMaterial(values: PublicCommodityEntity) {
    await Utils.validateError(values, MaterialEntity);
    const material = new MaterialEntity();
    material.publicCommodity = values;
    await this.materialDao.createMaterial(material);
    return true;
  }

  async getMaterialById(id: number) {
    const material = await this.materialDao.getMaterialById(id);
    return material;
  }
}
