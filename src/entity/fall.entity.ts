import { FallRelationTypeEnum } from 'src/enum/commodity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';
import { PublicCommodityEntity } from './public/public_commodity.entity';

/**
 * 掉落表
 * 表示各个物品掉落的概率及其数量
 */
@Entity('fall')
export default class FallEntity extends BasicTimeEntity {
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
    enum: FallRelationTypeEnum,
  })
  relation_type: FallRelationTypeEnum;

  /**
   * 掉落物品几率
   */
  @Column()
  probability: number;

  @Column(() => PublicCommodityEntity, { prefix: false })
  public_commodity: PublicCommodityEntity;
}
