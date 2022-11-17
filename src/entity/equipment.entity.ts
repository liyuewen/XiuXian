import { IsNotEmpty } from 'class-validator';
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
   * 1:武器
   * 2:头盔
   * 3:衣服
   * 4:鞋子
   * 5:项链
   * 6:戒指
   * 7:护腕
   * 8:腰带
   * 9:护符
   */
  @Column({
    type: 'enum',
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  })
  @IsNotEmpty()
  position: number;

  /**
   * 装备描述
   */
  @Column({
    length: '50',
    default: '',
  })
  desc: string;

  /**
   * 装备名称
   */
  @Column({
    length: '15',
  })
  @IsNotEmpty()
  name: string;

  /**
   * 装备类型
   * 1: 法宝装备
   * 2: 科技装备
   * 3: 灵魂装备
   */
  @Column({
    type: 'enum',
    enum: [1, 2, 3],
  })
  @IsNotEmpty()
  type: number;

  /**
   * 装备特效id
   */
  @Column({
    length: '20',
    default: '',
  })
  attribute_id: string;

  /**
   * 装备等级
   */
  @Column()
  @IsNotEmpty()
  level: number;

  /**
   * 限制修为等级
   */
  @Column()
  @IsNotEmpty()
  limit_xw_level: number;

  /**
   * 限制科技等级
   */
  @Column()
  @IsNotEmpty()
  limit_kj_level: number;
}
