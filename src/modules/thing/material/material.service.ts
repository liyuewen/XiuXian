import { Injectable } from '@nestjs/common';
import MaterialDao from 'src/dao/material.dao';
import MaterialEntity from 'src/entity/material.entity';
import { PublicThingEntity } from 'src/entity/public/thing.entity';
import EntityCommon from 'src/utils/entityCommon';
import Utils from 'src/utils/utils';

@Injectable()
export class MaterialService {
  constructor(private materialDao: MaterialDao) {}

  async createMaterial(options: PublicThingEntity) {
    const values = await EntityCommon.verifyEntity(new PublicThingEntity(), options);
    const material = new MaterialEntity();
    material.publicCommodity = values;
    const result = await this.materialDao.createMaterial(material);
    return {
      id: result.id,
    };
  }

  async getMaterialById(id: number) {
    const result = await this.materialDao.getMaterialById(id);
    return result;
  }
}
