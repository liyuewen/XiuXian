import { GoodsTypeEnum } from 'src/enum/goods.enum';
import { Column } from 'typeorm';
import { BasicTimeEntity } from './basic_time.entity';

export abstract class BasicGoodsEntity extends BasicTimeEntity {
  /**
   * 物品名称
   */
  @Column()
  name: string;

  @Column()
  desc: string;

  /**
   * 物品id
   */
  @Column()
  goods_id: number;

  @Column({
    type: 'enum',
    enum: GoodsTypeEnum,
  })
  goods_type: GoodsTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  count: number;
}
