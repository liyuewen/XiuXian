import { IsEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 地图
 */
@Entity('game_map')
export default class GameMapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmpty()
  name: string;

  /**
   * 地图描述
   */
  @Column()
  @IsEmpty()
  desc: string;

  /**
   * 当前地图限制修为等级
   */
  @Column()
  @IsEmpty()
  limit_xw_level: number;

  /**
   * 当前地图限制科技等级
   */
  @Column()
  @IsEmpty()
  limit_kj_level: number;

  /**
   * 地图类型
   */
  @Column()
  @IsEmpty()
  type: string;

  @Column()
  @IsEmpty()
  created_time: Date;

  @Column()
  updated_time: Date;
}
