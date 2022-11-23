import { IsNotEmpty } from 'class-validator';
import { GoodsTypeEnum } from 'src/enum/goods.enum';
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
   * 材料id
   */
  @Column()
  @IsNotEmpty()
  goods_id: number;

  /**
   * 材料类型
   */
  @Column({
    type: 'enum',
    enum: GoodsTypeEnum,
  })
  @IsNotEmpty()
  goods_type: GoodsTypeEnum;

  /**
   * 材料数量
   */
  @Column()
  @IsNotEmpty()
  goods_count: number;

  /**
   * 设计图id
   */
  @Column()
  @IsNotEmpty()
  design_drawing_id: number;

}
