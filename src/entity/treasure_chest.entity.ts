import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';
import { PublicCommodityEntity } from './public/public_commodity.entity';

/**
 * 宝箱表
 * 加一个宝箱列表
 */
@Entity('treasure_chest')
export default class TreasureChestEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => PublicCommodityEntity, { prefix: false })
  public_commodity: PublicCommodityEntity

}
