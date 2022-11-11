import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './base/basic_time.entity';

/**
 * 房间表
 */
@Entity('room')
export default class RoomEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 房间类型
   * 1. 普通房间
   * 2. 精英房间
   * 3. BOSS房间
   * 4. 宝箱房间
   */
  @Column()
  type: number;

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
