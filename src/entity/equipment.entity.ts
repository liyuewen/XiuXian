import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicAttrEntity } from './base/basic_attr.entity';

/**
 * 装备
 */
@Entity('equipment')
export default class EquipmentEntity extends BasicAttrEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 装备部位
   */
  @Column()
  position: string;

  /**
   * 装备名称
   */
  @Column({
    length: '15',
  })
  name: string;

  /**
   * 装备类型
   */
  @Column({
    length: '3',
  })
  type: string;

  /**
   * 装备特效id
   */
  @Column({
    length: '20',
  })
  attribute_id: string;

  /**
   * 装备等级
   */
  @Column()
  level: number;

  /**
   * 限制修为等级
   */
  @Column()
  limit_xw_level: number;

  /**
   * 限制科技等级
   */
  @Column()
  limit_kj_level: number;
}
