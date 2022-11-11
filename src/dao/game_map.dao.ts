import { Injectable } from '@nestjs/common';
import GameMapEntity from 'src/entity/game_map.entity';
import MonsterEntity from 'src/entity/monster.entity';
import RoomEntity from 'src/entity/room.entity';
import TreasureChestEntity from 'src/entity/treasure_chest.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class GameMapDao {
  constructor(private dataSource: DataSource) {}

  async getMap(type?: number): Promise<GameMapEntity[]> {
    const dataSource = this.dataSource;
    try {
      let map: GameMapEntity[] = [];
      const createQueryBuilder = dataSource.createQueryBuilder(
        GameMapEntity,
        'game_map',
      );
      if (!!type) {
        map = await createQueryBuilder
          .where('game_map.type=:type', { type })
          .getRawMany();
      } else {
        map = await createQueryBuilder.getRawMany();
      }

      return map;
    } catch (error) {
      throw error;
    }
  }

  async getMapDetails(id: number) {
    const dataSource = this.dataSource;
    try {
      const map = await dataSource
        .createQueryBuilder(GameMapEntity, 'game_map')
        .leftJoinAndMapMany(
          'game_map.options',
          RoomEntity,
          'room',
          'game_map.id=room.game_map_id',
        )
        .leftJoinAndMapOne(
          'room.monster',
          MonsterEntity,
          'monster',
          'room.connection_id=monster.id',
        )
        .leftJoinAndMapOne(
          'room.treasure_chest',
          TreasureChestEntity,
          'treasure_chest',
          'room.connection_id=treasure_chest.id',
        )
        .select([
          'game_map',
          'room.id',
          'room.type',
          'room.sort',
          'room.game_map_id',
          'room.connection_id',
          'monster',
          'treasure_chest',
        ])
        .where('game_map.id=:id', { id })
        .orderBy('room.sort', 'ASC')
        .getManyAndCount();
      return map[0];
    } catch (error) {
      throw error;
    }
  }
}
