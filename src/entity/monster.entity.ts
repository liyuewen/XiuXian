import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicAttrEntity } from './base/basic_attr.entity';

/**
 * 怪物
 */
@Entity('monster')
export default class MonsterEntity extends BasicAttrEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**
   * 怪物描述
   * 一般不展示
   */
  @Column()
  description: string;

  /**
   * 修为等级
   */
  @Column()
  xw_level: number;

  /**
   * 科技等级
   */
  @Column()
  kj_level: number;

}
