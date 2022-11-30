import { Injectable } from '@nestjs/common';
import FallDao from 'src/dao/fall.dao';
import FallEntity from 'src/entity/fall.entity';
import EntityCommon from 'src/utils/entityCommon';

@Injectable()
export class FallService {
  constructor(private fallDao: FallDao) {}

  async createFall(options: Omit<FallEntity, 'id'>) {
    const values = await EntityCommon.verifyEntity(new FallEntity(), options);
    const fall = await this.fallDao.createFall(values);
    return {
      id: fall.id,
    };
  }
}
