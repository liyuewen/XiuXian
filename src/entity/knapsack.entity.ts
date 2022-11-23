import { IsNotEmpty } from 'class-validator';
import { GoodsSourceEnum } from 'src/enum/goods.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicQuoteGoodsEntity } from './base/basic_quote_goods.entity';

/**
 * 背包表
 */
@Entity('knapsack')
export default class KnapsackEntity extends BasicQuoteGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户id
   */
  @Column()
  @IsNotEmpty()
  character_id: number;

  /**
   * 物品来源
   */
  @Column({
    type: 'enum',
    enum: GoodsSourceEnum,
  })
  @IsNotEmpty()
  source: GoodsSourceEnum
}
