import { Injectable } from '@nestjs/common';
import AttributeEntity from 'src/entity/attribute.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class AttributeDao {
  constructor(private dataSource: DataSource) {}

  async createAttribute(values: Omit<AttributeEntity, 'id'>) {
    const dataSource = this.dataSource;
    try {
      const equipment = await dataSource
        .createQueryBuilder()
        .insert()
        .into(AttributeEntity)
        .values(values)
        .execute();
      return equipment;
    } catch (error) {
      throw error;
    }
  }
}