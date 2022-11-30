import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';
import RoomEntity from './room.entity';

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
  @Column({
    name: 'limit_xw_level',
  })
  @IsNotEmpty()
  limitWwLevel: number;

  /**
   * 当前地图限制科技等级
   */
  @Column({
    name: 'limit_science_level',
  })
  @IsNotEmpty()
  limitScienceLevel: number;

  // /**
  //  * 地图类型
  //  */
  // @Column()
  // @IsEmpty()
  // type: string;
}
