import { RoomTypeEnum } from 'src/enum/map.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';

/**
 * 房间表
 */
@Entity('room')
export default class RoomEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 房间类型
   */
  @Column({
    type: 'enum',
    enum: RoomTypeEnum,
  })
  type: RoomTypeEnum;

  /**
   * 关联id
   */
  @Column({
    name: 'game_map_id',
  })
  gameMapId: number;

  /**
   * 关联到当前房间怪物或者宝箱信息
   */
  @Column({
    name: 'connection_id',
  })
  connectionId: number;

  /**
   * 用于处理当前房间的顺序
   */
  @Column()
  sort: number;
}
