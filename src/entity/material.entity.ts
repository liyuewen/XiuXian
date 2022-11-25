import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basic_time.entity';
import { PublicCommodityEntity } from './public/public_commodity.entity';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => PublicCommodityEntity, { prefix: false })
  public_commodity: PublicCommodityEntity;
}
