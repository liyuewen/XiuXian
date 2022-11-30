import { IsNotEmpty, Max, Min } from 'class-validator';
import {
  AttributeTypeEnum,
  DamageTypeEnum,
  EquipmentPositionEnum,
  EquipmentTypeEnum,
} from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * 装备特效
 */
@Entity('attribute')
export default class AttributeEntity extends BasicTimeEntity {
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
    name: 'equipment_type',
  })
  @IsNotEmpty()
  equipmentType: EquipmentTypeEnum;

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
    name: 'attribute_type',
  })
  @IsNotEmpty()
  attributeType: AttributeTypeEnum;

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
    name: 'cooling_time',
  })
  @IsNotEmpty()
  coolingTime: number;

  /**
   * 特效的伤害数据来源
   */
  @Column({
    type: 'enum',
    enum: DamageTypeEnum,
    name: 'damage_type',
  })
  damageType: DamageTypeEnum;
}
