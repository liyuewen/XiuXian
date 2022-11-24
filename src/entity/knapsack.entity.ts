import { IsNotEmpty } from 'class-validator';
import { CommoditySourceEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicQuoteCommodityEntity } from './base/basic_quote_commodity.entity';

/**
 * 背包表
 */
@Entity('knapsack')
export default class KnapsackEntity extends BasicQuoteCommodityEntity {
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
    enum: CommoditySourceEnum,
  })
  @IsNotEmpty()
  source: CommoditySourceEnum
}
