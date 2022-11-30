import { Injectable } from '@nestjs/common';
import GameMapEntity from 'src/entity/gameMap.entity';
import MonsterEntity from 'src/entity/monster.entity';
import RoomEntity from 'src/entity/room.entity';
import TreasureChestEntity from 'src/entity/treasure_chest.entity';
import { DataSource } from 'typeorm';

@Injectable()
export default class GameMapDao {
  gameMap = this.dataSource.getRepository(GameMapEntity);
  room = this.dataSource.getRepository(RoomEntity);

  constructor(private dataSource: DataSource) {}

  async getMap(type?: number): Promise<GameMapEntity[]> {
    try {
      const map = await this.gameMap.find();
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

  async isMap(id: number) {
    try {
      const map = await this.gameMap.count({
        where: { id },
      });
      return map;
    } catch (error) {
      throw error;
    }
  }

  async createMap(values: Omit<GameMapEntity, 'id'>) {
    try {
      const map = await this.gameMap.save(values);
      return map;
    } catch (error) {
      throw error;
    }
  }

  async getRoomList(gameMapId: number) {
    try {
      const room = await this.room.find({
        where: { gameMapId },
        order: { sort: 'ASC' },
      });
      return room;
    } catch (error) {
      throw error;
    }
  }

  async createRoom(values: Omit<RoomEntity, 'id'>) {
    try {
      const room = await this.room.save(values);
      return room;
    } catch (error) {
      throw error;
    }
  }

  async updateRoom(values: RoomEntity) {
    try {
      const room = await this.room.update(values.id, values);
      return room;
    } catch (error) {
      throw error;
    }
  }
}
