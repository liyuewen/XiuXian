import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicGoodsEntity } from './base/basic_goods.entity';

/**
 * 宝箱表
 * 加一个宝箱列表
 */
@Entity('treasure_chest')
export default class TreasureChestEntity extends BasicGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
