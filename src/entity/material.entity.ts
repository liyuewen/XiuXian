import { IsNotEmpty } from 'class-validator';
import { MaterialRarityEnum } from 'src/enum/goods.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  desc: string;

  /**
   * 稀有度
   */
  @Column({
    type: 'enum',
    enum: MaterialRarityEnum,
  })
  @IsNotEmpty()
  rarity: MaterialRarityEnum;
}
