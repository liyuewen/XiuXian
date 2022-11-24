import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicCommodityEntity } from './base/basic_commodity.entity';

/**
 * 宝箱表
 * 加一个宝箱列表
 */
@Entity('treasure_chest')
export default class TreasureChestEntity extends BasicCommodityEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
