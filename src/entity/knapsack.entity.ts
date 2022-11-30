import { IsNotEmpty } from 'class-validator';
import { CommoditySourceEnum, CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';
import { PublicCommodityEntity } from './public/publicCommodity.entity';

/**
 * 背包表
 */
@Entity('knapsack')
export default class KnapsackEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户id
   */
  @Column({
    name: 'character_id',
  })
  @IsNotEmpty()
  characterId: number;

  /**
   * 商品id
   */
  @Column({
    name: 'commodity_id',
  })
  commodityId: number;

  /**
   * 商品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
    name: 'commodity_type',
  })
  commodityType: CommodityTypeEnum;

  @Column({
    default: 1,
  })
  @IsNotEmpty()
  quantity: number;

  /**
   * 物品来源
   */
  @Column({
    type: 'enum',
    enum: CommoditySourceEnum,
  })
  @IsNotEmpty()
  source: CommoditySourceEnum;

  @Column({
    default: 0,
    type: 'smallint',
  })
  sort: number;

  @Column(() => PublicCommodityEntity, { prefix: false })
  publicCommodity: PublicCommodityEntity;

  @Column({
    name: 'created_by',
  })
  @IsNotEmpty()
  createdBy: number;

  @Column({
    name: 'updated_by',
  })
  @IsNotEmpty()
  updatedBy: number;

  @Column({
    name: 'deleted_by',
  })
  deletedBy: number;
}
