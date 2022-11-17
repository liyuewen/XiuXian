import { GoodsTypeEnum } from 'src/enum/goods.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicGoodsEntity } from './base/basic_goods.entity';

/**
 * 背包表
 */
@Entity('knapsack')
export default class KnapsackEntity extends BasicGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户id
   */
  @Column()
  user_id: number;
}
