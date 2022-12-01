import { Injectable } from '@nestjs/common';
import GameMapDao from 'src/dao/gameMap.dao';
import GameMapEntity from 'src/entity/gameMap.entity';
import EntityCommon from 'src/utils/entityCommon';

@Injectable()
export class MapService {
  constructor(private gameMapDao: GameMapDao) {}

  async getMapList() {
    const result = await this.gameMapDao.getMap(2);
    return true;
  }

  async getMapDetails(id: number) {
    const result = await this.gameMapDao.getMapDetails(id);
    return result;
  }

  async createMap(options: Omit<GameMapEntity, 'id'>) {
    const values = await EntityCommon.verifyEntity(new GameMapEntity(), options);
    const result = await this.gameMapDao.createMap(values);
    return {
      id: result.id,
    };
  }
}
