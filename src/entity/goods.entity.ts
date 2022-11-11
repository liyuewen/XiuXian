import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 物品
 */
@Entity('goods')
export default class GoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 物品类型
   * 1. 装备
   * 2. 药品
   * 3. 材料
   * 4. 宝箱
   * 5. 其他
   */
  @Column()
  type: number;

  /**
   * 物品id用于去对应表查出物品的详细信息
   * 和物品的id相关联
   */
  @Column()
  correlation_id: number;

  @Column()
  created_time: Date;

  @Column()
  updated_time: Date;
}
