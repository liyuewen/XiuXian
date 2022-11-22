import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './base/basic_time.entity';

/**
 * 地图
 */
@Entity('game_map')
export default class GameMapEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  /**
   * 地图描述
   */
  @Column()
  @IsNotEmpty()
  desc: string;

  /**
   * 当前地图限制修为等级
   */
  @Column()
  @IsNotEmpty()
  limit_xw_level: number;

  /**
   * 当前地图限制科技等级
   */
  @Column()
  @IsNotEmpty()
  limit_kj_level: number;

  // /**
  //  * 地图类型
  //  */
  // @Column()
  // @IsEmpty()
  // type: string;
}
