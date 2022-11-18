import { FallRelationTypeEnum } from 'src/enum/fall.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicGoodsEntity } from './base/basic_goods.entity';

/**
 * 掉落表
 * 表示各个物品掉落的概率及其数量
 */
@Entity('fall')
export default class FallEntity extends BasicGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 一般只有怪物，任务才会掉落东西
   * 而当前id就是怪物或者任务的id
   */
  @Column()
  relation_id: number;

  /**
   * 1:怪物 2:任务
   */
  @Column({
    type: 'enum',
    enum: [FallRelationTypeEnum.monster, FallRelationTypeEnum.task],
  })
  relation_type: FallRelationTypeEnum;

  /**
   * 掉落物品几率
   */
  @Column()
  probability: number;
}
