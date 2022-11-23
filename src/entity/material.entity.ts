import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicGoodsEntity } from './base/basic_goods.entity';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity extends BasicGoodsEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
