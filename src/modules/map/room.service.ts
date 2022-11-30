import { Injectable } from '@nestjs/common';
import HttpError from 'src/common/error/httpError';
import GameMapDao from 'src/dao/gameMap.dao';
import RoomEntity from 'src/entity/room.entity';
import Utils from 'src/utils/utils';

@Injectable()
export class RoomService {
  constructor(private gameMapDao: GameMapDao) {}

  /**
   * 插入时规则
   * 假设当前地图有20个房间那么我想插入第十个那么，已有的10后面的房间的sort都要+1
   * 所以需要取出当前地图的所有房间，然后根据sort进行排序，然后根据sort进行插入
   */
  async createRoom(values: Omit<RoomEntity, 'id'>) {
    await Utils.validateError(values, RoomEntity);
    const countMap = await this.gameMapDao.isMap(values.gameMapId);
    if (countMap === 0) {
      throw new HttpError('地图不存在', 12404);
    }
    const roomList = await this.gameMapDao.getRoomList(values.gameMapId);
    if (roomList.length === 0) {
      const result = await this.gameMapDao.createRoom(values);
    }else {
      const sortList = roomList.map((room) => room.sort);
      const maxSort = Math.max(...sortList);
      if (values.sort > maxSort) {
        const result = await this.gameMapDao.createRoom(values);
      } else {
        const targetRoom = roomList.find((room) => room.sort === values.sort);
        if (targetRoom) {
          const result = await this.gameMapDao.createRoom(values);
          const updateRoomList = roomList.filter((room) => room.sort >= values.sort);
          for (const room of updateRoomList) {
            room.sort += 1;
            await this.gameMapDao.updateRoom(room);
          }
        } else {
          throw new HttpError('房间不存在', 12405);
        }
      }
    }
    return true;
  }

  async getList(game_map_id: number) {
    const countMap = await this.gameMapDao.isMap(game_map_id);
    if (countMap === 0) {
      throw new HttpError('地图不存在', 12404);
    }
    const roomList = await this.gameMapDao.getRoomList(game_map_id);
    return roomList;
  }
}
