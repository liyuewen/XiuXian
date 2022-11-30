import { IsNotEmpty } from 'class-validator';
import { DesignDrawingTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';

/**
 * 设计图
 */
@Entity('design_drawing')
export default class DesignDrawingEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  /**
   * 目标合成物类型
   */
  @Column({
    type: 'enum',
    enum: DesignDrawingTypeEnum,
  })
  @IsNotEmpty()
  type: DesignDrawingTypeEnum;

  /**
   * 目标合成物id
   */
  @Column({
    name: 'composite_id',
  })
  @IsNotEmpty()
  compositeId: number;

  /**
   * 学习所需要的科技等级
   */
  @Column({
    name: 'science_level',
  })
  @IsNotEmpty()
  scienceLevel: number;

  /**
   * 推荐炼制的等级
   */
  @Column({
    name: 'recommend_science_level',
  })
  @IsNotEmpty()
  recommendScienceLevel: number;

  /**
   * 制作成功率
   */
  @Column({
    name: 'success_rate',
  })
  @IsNotEmpty()
  successRate: number;

  /**
   * 科技对转换率的加成
   * 包含负提升 公式每降低一级科技成功率降低(自身kj-recommend_kj_level)*kj_level
   * 如: success_rate = 90, kj_level = 5
   * 最终成功率就是 success_rate + (自身kj-recommend_kj_level)*kj_level
   */
  @Column({
    default: 10,
    name: 'factor',
  })
  factor: number;
}
