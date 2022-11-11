import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ResultFormat from 'src/common/format/result';
import GameMapDao from 'src/dao/game_map.dao';
import GameMapEntity from 'src/entity/game_map.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MapService {
  constructor(private gameMapDao: GameMapDao) {}

  async test() {
    const map = await this.gameMapDao.getMap(2);
    return ResultFormat.success({ data: map });
  }

  async getMapDetails(id: number) {
    const map = await this.gameMapDao.getMapDetails(id);
    return ResultFormat.success({ data: map });
  }
}
