import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column } from 'typeorm';

/**
 * 引用物品
 * 当某个表需要引用物品时，可以使用该表
 * 如背包需要物品，邮件需要物品
 */
export default class AssociateThingEntity {
  /**
   * 物品id
   */
  @Column({
    name: 'commodity_id',
  })
  @IsNotEmpty()
  commodityId: number;

  /**
   * 物品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
    name: 'commodity_type',
  })
  @IsNotEmpty()
  commodityType: CommodityTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  @IsNotEmpty()
  quantity: number;
}
