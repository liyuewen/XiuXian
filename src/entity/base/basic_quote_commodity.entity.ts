import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column } from 'typeorm';
import { BasicTimeEntity } from './basic_time.entity';

/**
 * 物品引用基础实体
 */
export abstract class BasicQuoteCommodityEntity extends BasicTimeEntity {
  /**
   * 物品id
   */
  @Column()
  @IsNotEmpty()
  commodity_id: number;

  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
  })
  @IsNotEmpty()
  commodity_type: CommodityTypeEnum;

  /**
   * 物品数量
   */
  @Column({
    type: "mediumint",
    default: 0,
  })
  @IsNotEmpty()
  quantity: number;
}
