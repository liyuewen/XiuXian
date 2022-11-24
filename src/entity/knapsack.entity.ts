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
  source: CommoditySourceEnum;

  @Column({
    default: 0,
    type: 'smallint',
  })
  sort: number;

  @Column()
  @IsNotEmpty()
  created_at: Date;

  @Column()
  @IsNotEmpty()
  updated_at: Date;

  @Column()
  delete_at: Date;

  @Column()
  @IsNotEmpty()
  created_by: number;

  @Column()
  @IsNotEmpty()
  updated_by: number;

  @Column()
  delete_by: number;
}
