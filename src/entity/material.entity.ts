import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("material")
export class MaterialEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;
  
  /**
   * 稀有度
   */
  @Column()
  rarity: number;

}