import { Injectable } from '@nestjs/common';
import GameMapDao from 'src/dao/game_map.dao';
import GameMapEntity from 'src/entity/game_map.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class MapService {
  constructor(private gameMapDao: GameMapDao) {}

  async getMapList() {
    const map = await this.gameMapDao.getMap(2);
    return true;
  }

  async getMapDetails(id: number) {
    const map = await this.gameMapDao.getMapDetails(id);
    return true;
  }

  async createMap(map: Omit<GameMapEntity, 'id'>) {
    await Utils.validateError(map, GameMapEntity);
    const result = await this.gameMapDao.createMap(map);
    return true;
  }
}
