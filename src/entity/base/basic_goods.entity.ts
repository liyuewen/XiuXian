import { IsNotEmpty } from 'class-validator';
import { MaterialRarityEnum } from 'src/enum/goods.enum';
import { Column } from 'typeorm';

/**
 * 物品基础实体
 */
export abstract class BasicGoodsEntity {
  /**
   * 物品名称
   */
  @Column()
  @IsNotEmpty()
  name: number;

  /**
   * 物品描述
   */
  @Column()
  @IsNotEmpty()
  desc: string;

  /**
   * 物品堆叠上限
   * 0为不可堆叠
   * -1为无限堆叠
   * 其他为具体的堆叠上限
   * 堆叠到上限后，物品会自动分裂
   */
  @Column({
    default: 999,
  })
  @IsNotEmpty()
  stacking_limit: number;

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
