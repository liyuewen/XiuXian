import { IsNotEmpty, Max, Min } from 'class-validator';
import {
  AttributeTypeEnum,
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
  equipment_type: EquipmentTypeEnum;

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
   * 特效类型如流血，眩晕等
   */
  @Column({
    type: 'enum',
    enum: AttributeTypeEnum,
  })
  @IsNotEmpty()
  attribute_type: AttributeTypeEnum;

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
   * 加成比例 0-100
   */
  @Column({
    default: 0,
    type: 'tinyint',
  })
  @Min(0, {
    message: '加成比例不能小于0',
  })
  @Max(100, {
    message: '加成比例不能大于100',
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
