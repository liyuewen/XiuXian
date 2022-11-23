import { IsNotEmpty } from 'class-validator';
import { GoodsTypeEnum } from 'src/enum/goods.enum';
import { Column } from 'typeorm';
import { BasicTimeEntity } from './basic_time.entity';

/**
 * 物品引用基础实体
 */
export abstract class BasicQuoteGoodsEntity extends BasicTimeEntity {
  /**
   * 物品id
   */
  @Column()
  @IsNotEmpty()
  goods_id: number;

  @Column({
    type: 'enum',
    enum: GoodsTypeEnum,
  })
  @IsNotEmpty()
  goods_type: GoodsTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  @IsNotEmpty()
  goods_count: number;
}
