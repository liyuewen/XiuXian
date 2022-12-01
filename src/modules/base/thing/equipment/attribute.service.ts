import { Injectable } from '@nestjs/common';
import AttributeDao from 'src/dao/attribute.dao';
import AttributeEntity from 'src/entity/attribute.entity';
import EntityCommon from 'src/utils/entityCommon';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeDao: AttributeDao) {}

  async createAttribute(options: AttributeEntity) {
    const values = await EntityCommon.verifyEntity(new AttributeEntity(), options);
    const result = await this.attributeDao.createAttribute(values);
    return {
      id: result.id,
    }
  }
}
