import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';

/**
 * 角色装备穿戴表
 */
@Entity()
export default class WearEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 穿戴的装备部位
   */
  @Column()
  position: string;

  /**
   * 装备id
   */
  @Column()
  equipment_id: string;

  /**
   * 角色id
   */
  @Column()
  character_id: number;
}
