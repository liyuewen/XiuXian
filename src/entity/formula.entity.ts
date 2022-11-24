import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 配方表
 * 首先设计图是的配方
 * 后面可能增加其他用途
 */
@Entity('formula')
export default class FormulaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 物品id
   */
  @Column()
  @IsNotEmpty()
  commodity_id: number;

  /**
   * 物品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
  })
  @IsNotEmpty()
  commodity_type: CommodityTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  @IsNotEmpty()
  quantity: number;

  /**
   * 设计图id
   */
  @Column()
  @IsNotEmpty()
  design_drawing_id: number;

}
