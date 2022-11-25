import { IsNotEmpty } from 'class-validator';
import { CommoditySourceEnum, CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';
import { PublicCommodityEntity } from './public/public_commodity.entity';

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
  @Column()
  @IsNotEmpty()
  character_id: number;

  /**
   * 商品id
   */
  @Column()
  commodity_id: number;

  /**
   * 商品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
  })
  commodity_type: CommodityTypeEnum;

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
  public_commodity: PublicCommodityEntity;

  @Column()
  @IsNotEmpty()
  created_by: number;

  @Column()
  @IsNotEmpty()
  updated_by: number;

  @Column()
  delete_by: number;
}
