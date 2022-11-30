import { IsNotEmpty } from 'class-validator';
import {
  EquipmentPositionEnum,
  EquipmentTypeEnum,
  MaterialRarityEnum,
} from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';
import { PublicAttrEntity } from './public/publicAttr.entity';
import { PublicCommodityEntity } from './public/publicCommodity.entity';

/**
 * 装备
 */
@Entity('equipment')
export default class EquipmentEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EquipmentPositionEnum,
  })
  @IsNotEmpty()
  position: EquipmentPositionEnum;

  /**
   * 装备描述
   */
  @Column({
    length: '50',
    default: '',
  })
  desc: string;

  /**
   * 法宝类型
   */
  @Column({
    type: 'enum',
    enum: EquipmentTypeEnum,
  })
  @IsNotEmpty()
  type: EquipmentTypeEnum;

  /**
   * 装备特效id
   */
  @Column({
    length: '20',
    default: '',
    name: 'attribute_id',
  })
  attributeId: string;

  /**
   * 装备等级
   */
  @Column()
  @IsNotEmpty()
  level: number;

  /**
   * 限制修为等级
   */
  @Column({
    name: 'limit_xw_level',
  })
  @IsNotEmpty()
  limitXwLevel: number;

  /**
   * 限制科技等级
   */
  @Column({
    name: 'limit_science_level',
  })
  @IsNotEmpty()
  limitScienceLevel: number;

  /**
   * 稀有度
   * 暂时影响的是出特效是特效的上限
   */
  @Column({
    type: 'enum',
    enum: MaterialRarityEnum,
  })
  rarity: MaterialRarityEnum;

  @Column(() => PublicCommodityEntity, { prefix: false })
  publicCommodity: PublicCommodityEntity;

  @Column(() => PublicAttrEntity, { prefix: false })
  publicAttr: PublicAttrEntity;
}
