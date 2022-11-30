import { Injectable } from '@nestjs/common';
import AttributeEntity from 'src/entity/attribute.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class AttributeDao {
  attribute = this.dataSource.getRepository(AttributeEntity);

  constructor(private dataSource: DataSource) {}

  async createAttribute(values: AttributeEntity) {
    try {
      const equipment = await this.attribute.save(values);
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}
