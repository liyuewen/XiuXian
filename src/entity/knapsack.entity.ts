import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicTimeEntity } from "./base/basic_time.entity";

/**
 * 背包表
 */
@Entity("knapsack")
export default class KnapsackEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 物品id
   */
  @Column()
  goods_id: number;

}