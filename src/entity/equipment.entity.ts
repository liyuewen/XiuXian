import { IsNotEmpty } from 'class-validator';
import {
  EquipmentPositionEnum,
  EquipmentTypeEnum,
  MaterialRarityEnum,
} from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';
import { PublicAttrEntity } from './public/public_attr.entity';
import { PublicCommodityEntity } from './public/public_commodity.entity';

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
  public_commodity: PublicCommodityEntity;

  @Column(() => PublicAttrEntity, { prefix: false })
  public_attr: PublicAttrEntity;
}
