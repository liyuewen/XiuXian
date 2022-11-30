import { IsNotEmpty } from 'class-validator';
import {
  EquipmentPositionEnum,
  EquipmentTypeEnum,
  MaterialRarityEnum,
} from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import { PublicAttrEntity } from './public/attr.entity';
import { PublicThingEntity } from './public/thing.entity';

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

  @Column(() => PublicThingEntity, { prefix: false })
  publicCommodity: PublicThingEntity;

  @Column(() => PublicAttrEntity, { prefix: false })
  publicAttr: PublicAttrEntity;
}
