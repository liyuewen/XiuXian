import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 角色装备穿戴表
 */
@Entity()
export default class WearEntity {
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
