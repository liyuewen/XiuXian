import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTimeEntity } from './basic/basicTime.entity';
import { PublicCommodityEntity } from './public/publicCommodity.entity';

/**
 * 材料
 */
@Entity('material')
export default class MaterialEntity extends BasicTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => PublicCommodityEntity, { prefix: false })
  publicCommodity: PublicCommodityEntity;
}
