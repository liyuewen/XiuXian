import { Injectable } from '@nestjs/common';
import AttributeDao from 'src/dao/attribute.dao';
import AttributeEntity from 'src/entity/attribute.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeDao: AttributeDao) {}

  async createAttribute(options: Omit<AttributeDao, 'id'>) {
    await Utils.validateError(options, AttributeEntity);
    console.log(options);
    return 1;
  }
}
