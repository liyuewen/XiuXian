import { Injectable } from '@nestjs/common';
import FallDao from 'src/dao/fall.dao';
import FallEntity from 'src/entity/fall.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class FallService {
  constructor(private fallDao: FallDao) {}

  async createFall(values: Omit<FallEntity, 'id'>) {
    await Utils.validateError(values, FallEntity);
    const fall = await this.fallDao.createFall(values);
    return true;
  }
}
