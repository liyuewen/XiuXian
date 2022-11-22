import { Injectable } from '@nestjs/common';
import AttributeDao from 'src/dao/attribute.dao';
import AttributeEntity from 'src/entity/attribute.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeDao: AttributeDao) {}

  async createAttribute(options: Omit<AttributeEntity, 'id'>) {
    await Utils.validateError(options, AttributeEntity);
    const result = await this.attributeDao.createAttribute(options);
    console.log(result);
    return true;
  }
}
