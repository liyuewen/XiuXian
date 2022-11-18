import { IsNotEmpty } from 'class-validator';
import {
  DamageTypeEnum,
  EquipmentPositionEnum,
  EquipmentTypeEnum,
} from 'src/enum/goods.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 装备特效
 */
@Entity('attribute')
export default class AttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 装备等级
   * 有些特效只有装备到达一定等级出现
   */
  @Column()
  @IsNotEmpty()
  level: number;

  /**
   * 装备特效名称
   */
  @Column({
    length: '15',
  })
  @IsNotEmpty()
  name: string;

  /**
   * 装备特效描述
   */
  @Column({
    length: '50',
  })
  @IsNotEmpty()
  desc: string;

  /**
   * 特效属于那种法宝类型
   */
  @Column({
    type: 'enum',
    enum: EquipmentTypeEnum,
  })
  @IsNotEmpty()
  type: EquipmentTypeEnum;

  /**
   * 特效属于那种法宝位置
   */
  @Column({
    type: 'enum',
    enum: EquipmentPositionEnum,
  })
  @IsNotEmpty()
  position: EquipmentPositionEnum;

  /**
   * 触发概率
   * 0-100
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  @IsNotEmpty()
  probability: number;

  /**
   * 加成比例
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  @IsNotEmpty()
  proportion: number;

  /**
   * 持续回合
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  @IsNotEmpty()
  continuous: number;

  /**
   * 冷却时间
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  @IsNotEmpty()
  cooling_time: number;

  /**
   * 特效的伤害数据来源
   */
  @Column({
    type: 'enum',
    enum: DamageTypeEnum,
  })
  damage_type: DamageTypeEnum;
}
