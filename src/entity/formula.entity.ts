import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';

/**
 * 配方表
 * 首先设计图是的配方
 * 后面可能增加其他用途
 */
@Entity('formula')
export default class FormulaEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 物品id
   */
  @Column({
    name: 'commodity_id',
  })
  @IsNotEmpty()
  commodityId: number;

  /**
   * 物品类型
   */
  @Column({
    type: 'enum',
    enum: CommodityTypeEnum,
    name: 'commodity_type',
  })
  @IsNotEmpty()
  commodityType: CommodityTypeEnum;

  /**
   * 物品数量
   */
  @Column()
  @IsNotEmpty()
  quantity: number;

  /**
   * 设计图id
   */
  @Column({
    name: 'design_drawing_id',
  })
  @IsNotEmpty()
  designDrawingId: number;
}
