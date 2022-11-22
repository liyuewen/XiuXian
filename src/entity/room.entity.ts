import { RoomTypeEnum } from 'src/enum/map.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './base/basic_time.entity';

/**
 * 房间表
 */
@Entity('room')
export default class RoomEntity {
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
  @Column()
  game_map_id: number;

  /**
   * 关联到当前房间怪物或者宝箱信息
   */
  @Column()
  connection_id: number;

  /**
   * 用于处理当前房间的顺序
   */
  @Column()
  sort: number;
}
