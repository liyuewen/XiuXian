import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/time.entity';
import { PublicThingEntity } from './public/thing.entity';

/**
 * 宝箱表
 * 加一个宝箱列表
 */
@Entity('treasure_chest')
export default class TreasureChestEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => PublicThingEntity, { prefix: false })
  publicCommodity: PublicThingEntity

}
