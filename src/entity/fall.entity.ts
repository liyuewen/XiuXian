import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicGoodsEntity } from './base/basic_goods.entity';

/**
 * 掉落表
 * 表示各个物品掉落的概率及其数量
 */
@Entity('fall')
export default class FallEntity extends BasicGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 掉落物品的数量
   */
  @Column()
  count: string;

  /**
   * 标明当前物品属于
   * 宝箱，怪物，活动，副本，任务
   */
  @Column()
  correlation_id: number;

  /**
   * 掉落物品几率
   */
  @Column()
  probability: number;
}
