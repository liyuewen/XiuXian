import { IsNotEmpty } from 'class-validator';
import { DesignDrawingTypeEnum } from 'src/enum/goods.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface DesignDrawingFormula {
  /**
   * 装备id
   */
  equipment_id: number;
  /**
   * 材料id
   */
  material_id: number;
  /**
   * 材料数量
   */
  amount: number;
}

/**
 * 设计图
 */
@Entity('design_drawing')
export default class DesignDrawingEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  /**
   * 目标合成物类型
   */
  @Column({
    type: "enum",
    enum: DesignDrawingTypeEnum,
  })
  @IsNotEmpty()
  type: DesignDrawingTypeEnum;

  /**
   * 目标合成物id
   */
  @Column()
  @IsNotEmpty()
  composite_id: number;

  /**
   * 学习所需要的科技等级
   */
  @Column()
  @IsNotEmpty()
  kj_level: number;

  /**
   * 推荐炼制的等级
   */
  @Column()
  @IsNotEmpty()
  recommend_kj_level: number;

  /**
   * 制作成功率
   */
  @Column()
  @IsNotEmpty()
  success_rate: number;

  /**
   * 科技对转换率的加成
   * 包含负提升 公式每降低一级科技成功率降低(自身kj-recommend_kj_level)*kj_level
   * 如: success_rate = 90, kj_level = 5
   * 最终成功率就是 success_rate + (自身kj-recommend_kj_level)*kj_level
   */
  @Column({
    default: 10,
  })
  kj_factor: number;

}