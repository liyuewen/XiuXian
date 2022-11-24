import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicCommodityEntity } from './base/basic_commodity.entity';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity extends BasicCommodityEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
