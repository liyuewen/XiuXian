import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicTimeEntity } from "./base/basic_time.entity";

/**
 * 宝箱表
 */
@Entity("treasure_chest")
export default class TreasureChestEntity extends BasicTimeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

}