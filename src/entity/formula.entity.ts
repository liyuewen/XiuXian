import { IsNotEmpty } from 'class-validator';
import { CommodityTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import AssociateThingEntity from './public/associateThing.entity';

/**
 * 配方表
 * 通过设计图的id来关联对应的配方
 * 后面可能增加其他用途
 */
@Entity('formula')
export default class FormulaEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 当前配方需要的物品
   */
  @Column(() => AssociateThingEntity, { prefix: false })
  thing: AssociateThingEntity;

  /**
   * 设计图id
   */
  @Column({
    name: 'design_drawing_id',
  })
  @IsNotEmpty()
  designDrawingId: number;
}
